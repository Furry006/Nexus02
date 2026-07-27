import { eq, or } from "drizzle-orm";
import * as argon2 from "argon2";
import { z } from "zod";
import { db } from "#/db/index.js";
import { users } from "#/db/schemas/user.js";
import { registerSchema, loginSchema } from "./schemas.js";
import type { Context } from "hono";
import {
  generateAccessToken,
  generateRefreshToken,
  setAuthCookies,
  clearAuthCookies,
  verifyRefreshToken,
  saveRefreshToken,
} from "#/utils/helpers.js";
import { HttpError, HttpStatus } from "#/utils/http/index.js";
import { refreshTokens } from "#/db/schemas/refresh-token.js";

type RegisterInput = typeof registerSchema._output;
type LoginInput = z.infer<typeof loginSchema>;


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
      throw new HttpError(HttpStatus.CONFLICT, "Email already exists");
    }

    if (existingUser.username === username) {
      throw new HttpError(HttpStatus.CONFLICT, "Username already exists");
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


export const logIn = async (
  data: LoginInput,
  c: Context,
): Promise<{
  success: true;
  message: string;
  data: { id: string; username: string; email: string };
}> => {
  //find user
  const user = await db.query.users.findFirst({
    where: eq(users.email, data.email),
  });
  if (!user) {
    throw new HttpError(HttpStatus.UNAUTHORIZED, "Invalid email or password");
  }
  //verify password
  const isPasswordValid = await argon2.verify(user.password, data.password);
  if (!isPasswordValid) {
    throw new HttpError(HttpStatus.UNAUTHORIZED, "Invalid email or password");
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
  //save in Db 
  await saveRefreshToken(
    user.id,
    refreshToken,
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );
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

export const logout = async (
  c: Context,
): Promise<{
  success: true;
  message: string;
}> => {
  await clearAuthCookies(c);

  return {
    success: true,
    message: "Logout successful",
  };
};

export const refreshToken = async (
  token: string,
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const payload = await verifyRefreshToken(token);

  const storedToken = await db.query.refreshTokens.findFirst({
    where: eq(refreshTokens.token, token),
  });

  if (!storedToken) {
    throw new HttpError(HttpStatus.UNAUTHORIZED, "Refresh token not found");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, payload["id"] as string),
  });
  if (!user) {
    throw new HttpError(HttpStatus.NOT_FOUND, "User Not Found");
  }

  const accessToken = await generateAccessToken({
    id: user.id,
    email: user.email,
  });

  return {
    accessToken,
    refreshToken: token,
  };
};

