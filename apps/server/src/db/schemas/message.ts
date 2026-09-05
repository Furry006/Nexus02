import { pgTable, uuid, text, timestamp, index } from "drizzle-orm/pg-core";

import { users, conversations } from "./index.js";

export const messages = pgTable(
  "messages",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversations.id, {
        onDelete: "cascade",
      }),

    senderId: uuid("sender_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    content: text("content").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },

  (table) => [
    index("messages_conversation_created_at_idx").on(
      table.conversationId,
      table.createdAt,
      table.id,
    ),
  ],
);