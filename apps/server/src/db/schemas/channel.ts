import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

import { workspaces } from "./index.js";

export const channels = pgTable("channels", {
  id: uuid("id").defaultRandom().primaryKey(),

  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, {
      onDelete: "cascade",
    }),

  name: varchar("name", {
    length: 100,
  }).notNull(),

  description: text("description"),

  visibility: varchar("visibility", { length: 20 }).notNull().default("public"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
