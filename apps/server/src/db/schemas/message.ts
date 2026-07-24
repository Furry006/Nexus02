import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

import { users, channels } from "./index.js";

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),

  channelId: uuid("channel_id")
    .notNull()
    .references(() => channels.id, {
      onDelete: "cascade",
    }),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  content: text("content").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
