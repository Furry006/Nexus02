import { and, asc, eq, exists } from "drizzle-orm"
import { db } from "#/db/index.js"
import { channels, workspaceMembers, workspaces } from "#/db/schemas/index.js"
import { HttpError, HttpStatus } from "#/utils/http/index.js"
import type { CreateChannelInput, UpdateChannelInput } from "./schemas.js";


type CreateChannelServiceInput = CreateChannelInput & {
    workspaceId: string;
    userId: string;
};

export const createChannel = async ({
    workspaceId,
    userId,
    name,
    description,
    isPrivate,
}: CreateChannelServiceInput) => {
    const workspace = await db.query.workspaces.findFirst({
        where: eq(workspaces.id, workspaceId)
    });
    if (!workspace) {
        throw new HttpError(
            HttpStatus.NOT_FOUND,
            "Workspace not found",
        );
    }

    const membership = await db.query.workspaceMembers.findFirst({
        where: and(
            eq(workspaceMembers.workspaceId, workspaceId),
            eq(workspaceMembers.userId, userId),
        ),
    })
    if (!membership) {
        throw new HttpError(
            HttpStatus.FORBIDDEN,
            "You are not a member of this workspace",
        );
    }
    if (membership.role !== 'owner') {
        throw new HttpError(
            HttpStatus.FORBIDDEN,
            "You are not allowed to create channels"
        );
    }

    const existingChannel = await db.query.channels.findFirst({
        where: and(
            eq(channels.workspaceId, workspaceId),
            eq(channels.name, name),
        ),
    })
    if (existingChannel) {
        throw new HttpError(
            HttpStatus.CONFLICT,
            "Channel with this name already exists",
        );
    }

    const [channel] = await db
        .insert(channels)
        .values({
            workspaceId,
            name,
            description,
            visibility: isPrivate ? "private" : "public",
        })
        .returning();

    if (!channel) {
        throw new HttpError(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Failed to create channel",
        );
    }

    return channel;
}

type GetWorkspaceChannelsServiceInput = {
    workspaceId: string;
    userId: string;
};

export const getWorkspaceChannels = async ({ workspaceId, userId }: GetWorkspaceChannelsServiceInput) => {
    const workspace = await db.query.workspaces.findFirst({
        where: eq(workspaces.id, workspaceId)
    });
    if (!workspace) {
        throw new HttpError(
            HttpStatus.NOT_FOUND,
            "Workspace not found",
        );
    }

    const membership = await db.query.workspaceMembers.findFirst({
        where: and(
            eq(workspaceMembers.workspaceId, workspaceId),
            eq(workspaceMembers.userId, userId),
        ),
    })
    if (!membership) {
        throw new HttpError(
            HttpStatus.FORBIDDEN,
            "You are not a member of this workspace",
        );
    }

    const workspaceChannels = await db
        .select()
        .from(channels)
        .where(eq(channels.workspaceId, workspaceId))
        .orderBy(asc(channels.createdAt))
        .execute();

    return workspaceChannels;
}

type UpdateChannelServiceInput = UpdateChannelInput & {
  workspaceId: string;
  channelId: string;
  userId: string;
};

export const updateChannel = async ({
  workspaceId,
  channelId,
  userId,
  ...updates
}: UpdateChannelServiceInput) => {
  const [updatedChannel] = await db
    .update(channels)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(channels.id, channelId),
        eq(channels.workspaceId, workspaceId),

        exists(
          db
            .select({ id: workspaceMembers.id })
            .from(workspaceMembers)
            .where(
              and(
                eq(workspaceMembers.workspaceId, workspaceId),
                eq(workspaceMembers.userId, userId),
                eq(workspaceMembers.role, "owner"),
              ),
            ),
        ),
      ),
    )
    .returning();

  if (!updatedChannel) {
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "Channel not found or you don't have permission",
    );
  }

  return updatedChannel;
};

