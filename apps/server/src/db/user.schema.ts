import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  username: text("username").notNull().unique(),

  fullName: text("full_name").notNull(),

  email: text("email").notNull().unique(),

  password: text("password").notNull(),

  avatar: text("avatar"),

  isVerified: boolean("is_verified").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
