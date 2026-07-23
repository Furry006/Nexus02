import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

import { users } from "./user.schema";
import { workspaces } from "./workspace.schema";

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
