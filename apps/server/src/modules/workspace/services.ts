import { eq } from "drizzle-orm";
import type { z } from "zod";

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
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "Workspace not found",
    );
  }

  if (workspace.ownerId !== userId) {
    throw new HttpError(
      HttpStatus.FORBIDDEN,
      "You are not allowed to perform this action",
    );
  }

  await db
    .delete(workspaces)
    .where(eq(workspaces.id, workspaceId));
};