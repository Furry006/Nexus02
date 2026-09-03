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
        .values({ type: "channel", channelId: targetId, lastInteractionAt: now, updatedAt: now })
        .onConflictDoUpdate({ target: conversations.channelId,
          set: { lastInteractionAt: now, updatedAt: now },
        })
        .returning({ id: conversations.id });

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

      const [userOneId, userTwoId] = [userId, targetId].sort();

      const [conversation] = await tx
        .insert(conversations)
        .values({ type: "direct", directUserOneId: userOneId, directUserTwoId: userTwoId, lastInteractionAt: now, updatedAt: now })
        .onConflictDoUpdate({
          target: [ conversations.directUserOneId, conversations.directUserTwoId ],
          set: { lastInteractionAt: now, updatedAt: now },
        })
        .returning({ id: conversations.id });

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

export const getMessages = async ({}: GetMessageServiceInput) => {

}
