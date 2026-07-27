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
import { refreshTokens } from "#/db/schemas/refresh-token.js";

type RegisterInput = typeof registerSchema._output;
type LoginInput = z.infer<typeof loginSchema>;
type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
};

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
    throw new Error("Invalid email or password");
  }
  //verify password
  const isPasswordValid = await argon2.verify(user.password, data.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
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
    throw new Error("Refresh token not found");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, payload["id"] as string),
  });
  if (!user) {
    throw new Error("User Not Found");
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

export const changePassword = async (
  userId: string,
  body: ChangePasswordInput,
) => {
  const { currentPassword, newPassword } = body;

  if (currentPassword === newPassword) {
    throw new Error("New password must be different from current password");
  }
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  if (!user) {
    throw new Error("User not Found");
  }

  const isPasswordValid = await argon2.verify(user.password, currentPassword);
  if (!isPasswordValid) {
    throw new Error("Incorrect Password");
  }

  const hashedPassword = await argon2.hash(newPassword);

  await db
    .update(users)
    .set({
      password: hashedPassword,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));

  await db.delete(refreshTokens).where(eq(refreshTokens.userId, userId));

  return {
    success: true as const,
    message: "Password changed successfully",
  };
};
