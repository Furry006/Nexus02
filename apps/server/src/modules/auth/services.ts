import { eq, or } from "drizzle-orm";
import * as argon2 from "argon2";

import { db } from "#/db/index.js";
import { users } from "#/db/schemas/user.js";
import { registerSchema, loginSchema } from "./schemas.js";
import type { Context } from "hono";
import {
  generateAccessToken,
  generateRefreshToken,
  setAuthCookies,
} from "#/utils/helpers.js";

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

type LoginSchema = typeof loginSchema

export const logIn = async (data: LoginSchema, c: Context) => {
  //find user
  const user = await db.query.users.findFirst({
    where: eq(users.email, data.email),
  });
  if (!user) {
    throw new Error("Invaild email or password");
  }

  //verify password
  const isPasswordValid = await argon2.verify(user.password, data.password);
  if (!isPasswordValid) {
    throw new Error("Invalid Password");
  }

  //generate access token
  const accessToken = await generateAccessToken({
    id: user.id,
    email: user.email,
  });
  //generate refresh Token
  const refreshToken = await generateRefreshToken({
    id: user.id,
    email: user.email,
  });

  //set Cookies
  await setAuthCookies(c, accessToken, refreshToken);

  return {
    success: true,
    message: "Login Successfully",
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
};

export const logout = async (c: Context) => {
  clearAuthCookies(c);

  return {
    success: true,
    message: "Logout successful",
  };
};
