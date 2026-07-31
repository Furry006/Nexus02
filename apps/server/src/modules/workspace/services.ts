import type { z } from "zod";
import { and, eq } from "drizzle-orm";
import { db } from "#/db/index.js";
import { workspaceMembers, workspaces } from "#/db/schemas/index.js";
import { generateInviteCode } from "#/utils/helpers.js";
import { HttpError } from "#/utils/http/error.js";
import { HttpStatus } from "#/utils/http/index.js";
import { createWorkspaceSchema, updateWorkspaceSchema } from "./schemas.js";

type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema> & {
  ownerId: string;
};
export const createWorkspace = async ({
  ownerId,
  name,
  description,
}: CreateWorkspaceInput) => {
  return db.transaction(async (tx) => {
    const [workspace] = await tx
      .insert(workspaces)
      .values({
        name,
        description,
        ownerId,
        inviteCode: generateInviteCode(),
      })
      .returning();

    if (!workspace) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to create workspace",
      );
    }

    await tx.insert(workspaceMembers).values({
      workspaceId: workspace.id,
      userId: ownerId,
      role: "owner",
    });

    return workspace;
  });
};

type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema> & {
  workspaceId: string;
  userId: string;
};
export const updateWorkspace = async ({
  workspaceId,
  userId,
  name,
  description,
}: UpdateWorkspaceInput) => {
  const workspace = await db.query.workspaces.findFirst({
    where: eq(workspaces.id, workspaceId),
  });

  if (!workspace) {
    throw new HttpError(HttpStatus.NOT_FOUND, "Workspace not found");
  }

  if (workspace.ownerId !== userId) {
    throw new HttpError(
      HttpStatus.FORBIDDEN,
      "You are not allowed to update this workspace",
    );
  }

  const [updatedWorkspace] = await db
    .update(workspaces)
    .set({
      name,
      description,
      updatedAt: new Date(),
    })
    .where(eq(workspaces.id, workspaceId))
    .returning();

  return updatedWorkspace;
};

type DeleteWorkspaceInput = {
  workspaceId: string;
  userId: string;
};
export const deleteWorkspace = async ({
  workspaceId,
  userId,
}: DeleteWorkspaceInput): Promise<void> => {
  const workspace = await db.query.workspaces.findFirst({
    where: eq(workspaces.id, workspaceId),
  });

  if (!workspace) {
    throw new HttpError(HttpStatus.NOT_FOUND, "Workspace not found");
  }
  if (workspace.ownerId !== userId) {
    throw new HttpError(
      HttpStatus.FORBIDDEN,
      "You are not allowed to perform this action",
    );
  }

  await db.delete(workspaces).where(eq(workspaces.id, workspaceId));
};

type GetWorkspaceInput = {
  workspaceId: string;
  userId: string;
};
export const getWorkspace = async ({
  workspaceId,
  userId,
}: GetWorkspaceInput) => {
  // 1. Find workspace
  const workspace = await db.query.workspaces.findFirst({
    where: eq(workspaces.id, workspaceId),
  });
  if (!workspace) {
    throw new HttpError(HttpStatus.NOT_FOUND, "Workspace not found");
  }
  // 2. Check membership
  const member = await db.query.workspaceMembers.findFirst({
    where: and(
      eq(workspaceMembers.workspaceId, workspaceId),
      eq(workspaceMembers.userId, userId),
    ),
  });
  if (!member) {
    throw new HttpError(
      HttpStatus.FORBIDDEN,
      "You are not a member of this workspace",
    );
  }
  // 3. Return workspace
  return workspace;
};

export const getMyWorkspace = async (userId: string) => {
  const workspacesList = await db
    .select({
      id: workspaces.id,
      name: workspaces.name,
      description: workspaces.description,
      ownerId: workspaces.ownerId,
      inviteCode: workspaces.inviteCode,
      createdAt: workspaces.createdAt,
      updatedAt: workspaces.updatedAt,
      role: workspaceMembers.role,
    })
    .from(workspaceMembers)
    .innerJoin(workspaces, eq(workspaceMembers.workspaceId, workspaces.id))
    .where(eq(workspaceMembers.userId, userId));

  return workspacesList;
};

type JoinWorkspaceInput = {
  userId: string;
  inviteCode: string;
};
export const joinWorkspace = async ({
  userId,
  inviteCode,
}: JoinWorkspaceInput) => {
  const workspace = await db.query.workspaces.findFirst({
    where: eq(workspaces.inviteCode, inviteCode),
  });
  if (!workspace) {
    throw new HttpError(HttpStatus.NOT_FOUND, "Invalid Invite Code");
  }

  const member = await db.query.workspaceMembers.findFirst({
    where: and(
      eq(workspaceMembers.workspaceId, workspace.id),
      eq(workspaceMembers.userId, userId),
    ),
  });
  if (member) {
    throw new HttpError(
      HttpStatus.CONFLICT,
      "You are already a member of this workspace",
    );
  }

  await db.insert(workspaceMembers).values({
    workspaceId: workspace.id,
    userId,
    role: "memeber",
  });

  return workspace;
};

type LeaveWorkspaceInput = {
  workspaceId: string;
  userId: string;
};
export const leaveWorkspace = async ({
  workspaceId,
  userId,
}: LeaveWorkspaceInput) => {
  const member = await db.query.workspaceMembers.findFirst({
    where: and(
      eq(workspaceMembers.workspaceId, workspaceId),
      eq(workspaceMembers.userId, userId),
    ),
  });
  if (!member) {
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "Workspace membership not found",
    );
  }
  if (member.role === "owner") {
    throw new HttpError(
      HttpStatus.FORBIDDEN,
      "Workspace owners cannot leave their workspace",
    );
  }

  await db
    .delete(workspaceMembers)
    .where(
      and(
        eq(workspaceMembers.workspaceId, workspaceId),
        eq(workspaceMembers.userId, userId),
      ),
    );
};