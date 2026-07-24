import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

import { users } from "./index.js";
import { workspaces } from "./index.js";

export const workspaceMembers = pgTable("workspace_members", {
  id: uuid("id").defaultRandom().primaryKey(),

  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, {
      onDelete: "cascade",
    }),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  role: varchar("role", {
    length: 50,
  })
    .notNull()
    .default("member"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
