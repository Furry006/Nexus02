import {
  pgTable,
  pgEnum,
  uuid,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { channels } from "./index.js";

export const conversationTypeEnum = pgEnum("conversation_type", [
  "channel",
  "direct",
]);

export const conversations = pgTable(
  "conversations",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    type: conversationTypeEnum("type").notNull(),

    channelId: uuid("channel_id").references(() => channels.id, {
      onDelete: "cascade",
    }),

    participants: uuid("participants").array(),

    lastInteractionAt: timestamp("last_interaction_at")
      .defaultNow()
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },

  (table) => [
    uniqueIndex("conversations_channel_unique").on(table.channelId),

    uniqueIndex("conversations_direct_participants_unique").on(
      table.participants,
    ),
  ],
);