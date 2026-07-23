import { eq, or } from "drizzle-orm";
import * as argon2 from "argon2";

import { db } from "#/db/index.js";
import { users } from "#/db/schemas/user.js";
import { registerSchema } from "./schemas.js";

type RegisterInput = typeof registerSchema._output;

export const signUp = async (data: RegisterInput) => {
  const { username, fullName, email, password } = data;

  // Check if username or email already exists
  const [existingUser] = await db
    .select()
    .from(users)
    .where(or(eq(users.email, email), eq(users.username, username)))
    .limit(1);

  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error("Email already exists");
    }

    if (existingUser.username === username) {
      throw new Error("Username already exists");
    }
  }

  // Hash password
  const hashedPassword = await argon2.hash(password);

  // Create user
  const [user] = await db
    .insert(users)
    .values({
      username,
      fullName,
      email,
      password: hashedPassword,
    })
    .returning({
      id: users.id,
      username: users.username,
      fullName: users.fullName,
      email: users.email,
    });

  return user;
};
