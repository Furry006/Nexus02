import { and, desc, eq, isNull, lt, or } from "drizzle-orm";
import { db } from "#/db/index.js";
import { conversations, messages } from "#/db/schemas/index.js";
import { HttpError, HttpStatus } from "#/utils/http/index.js";

type CreateMessageServiceInput = {
  type: "channel" | "direct";
  targetId: string;
  userId: string;
  content: string;
};

export const createMessage = async ({
  type,
  targetId,
  userId,
  content,
}: CreateMessageServiceInput) => {
  return db.transaction(async (tx) => {
    const now = new Date();

    let conversationId: string;

    if (type === "channel") {
      const [conversation] = await tx
        .insert(conversations)
        .values({
          type: "channel",
          channelId: targetId,
          lastInteractionAt: now,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: conversations.channelId,
          set: { lastInteractionAt: now, updatedAt: now },
        })
        .returning({
          id: conversations.id,
        });

      if (!conversation) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Unable to resolve channel conversation",
        );
      }
      conversationId = conversation.id;
    } else {
      if (targetId === userId) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "You cannot message yourself",
        );
      }

      const userOneId = userId < targetId ? userId : targetId;
      const userTwoId = userId < targetId ? targetId : userId;

      const [conversation] = await tx
        .insert(conversations)
        .values({
          type: "direct",
          directUserOneId: userOneId,
          directUserTwoId: userTwoId,
          lastInteractionAt: now,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: [
            conversations.directUserOneId,
            conversations.directUserTwoId,
          ],
          set: {
            lastInteractionAt: now,
            updatedAt: now,
          },
        })
        .returning({
          id: conversations.id,
        });

      if (!conversation) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Unable to resolve direct conversation",
        );
      }

      conversationId = conversation.id;
    }

    const [message] = await tx
      .insert(messages)
      .values({ conversationId, userId, content })
      .returning();

    return message;
  });
};

type GetMessageServiceInput = {
  type: "channel" | "direct";
  targetId: string;
  userId: string;
  limit: number;
  beforeCreatedAt?: string;
  beforeId?: string;
};

export const getMessages = async ({ 
    type,
    targetId,
    userId,
    limit,
    beforeCreatedAt,
    beforeId,
  }: GetMessageServiceInput) => {
  if (type === "direct" && targetId === userId) {
    throw new HttpError(
      HttpStatus.BAD_REQUEST,
      "You cannot message yourself",
    );
  }

  let conversationId: string | undefined;

  if (type === "channel") {
    const [conversation] = await db
      .select({
        id: conversations.id,
      })
      .from(conversations)
      .where(
        and(
          eq(conversations.type, "channel"),
          eq(conversations.channelId, targetId),
        ),
      )
      .limit(1);
      conversationId = conversation?.id;
  }

  else {
    const userOneId = userId < targetId ? userId : targetId;
    const userTwoId = userId < targetId ? targetId : userId;
    const [conversation] = await db
      .select({ id: conversations.id })
      .from(conversations)
      .where(
        and(
          eq(conversations.type, "direct"),
          eq(conversations.directUserOneId, userOneId),
          eq(conversations.directUserTwoId, userTwoId),
        ),
      )
      .limit(1);
      conversationId = conversation?.id;
  }

  if (!conversationId) {
    return {
      messages: [],
      hasMore: false,
      nextCursor: null,
    };
  }

  const cursorDate = beforeCreatedAt ? new Date(beforeCreatedAt) : undefined;
  const cursorCondition = cursorDate && beforeId ? or(
          lt(messages.createdAt, cursorDate),
          and(
            eq(messages.createdAt, cursorDate),
            lt(messages.id, beforeId),
          ),
        ) : undefined;

  const result = await db
    .select()
    .from(messages)
    .where(
      and(
        eq(messages.conversationId, conversationId),
        isNull(messages.deletedAt),
        cursorCondition,
      ),
    )
    .orderBy(
      desc(messages.createdAt),
      desc(messages.id),
    )
    .limit(limit + 1);

  const hasMore = result.length > limit;
  const page = hasMore ? result.slice(0, limit) : result;
  const oldestMessage = page[page.length - 1];

  return {
    messages: [...page].reverse(),
    hasMore,
    nextCursor: hasMore && oldestMessage ? { beforeCreatedAt: oldestMessage.createdAt.toISOString(), beforeId: oldestMessage.id } : null,
  };
};