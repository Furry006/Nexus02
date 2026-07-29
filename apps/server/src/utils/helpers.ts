import { SignJWT, jwtVerify } from "jose";
import { setCookie, deleteCookie } from "hono/cookie";
import type { Context } from "hono";
import { customAlphabet } from "nanoid";

import env from "#/configs/env.js";
import { db } from "#/db/index.js";
import { refreshTokens } from "#/db/schemas/index.js";

const accessSecret = new TextEncoder().encode(env.ACCESS_SECRET!);

const refreshSecret = new TextEncoder().encode(env.REFRESH_SECRET!);

export type JwtPayload = {
  id: string;
  email: string;
};

const generateToken = async (
  payload: JwtPayload,
  secret: Uint8Array,
  expiresIn: string,
) => {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
};

export const generateAccessToken = async (payload: JwtPayload) => {
  return generateToken(payload, accessSecret, "15m");
};

export const generateRefreshToken = async (payload: JwtPayload) => {
  return generateToken(payload, refreshSecret, "7d");
};

// Token verify
export const verifyAccessToken = async (token: string) => {
  const { payload } = await jwtVerify(token, accessSecret);

  return payload;
};

export const verifyRefreshToken = async (token: string) => {
  const { payload } = await jwtVerify(token, refreshSecret);

  return payload;
};

// Save refresh token
export const saveRefreshToken = async (
  userId: string,
  token: string,
  expiresAt: Date,
) => {
  await db.insert(refreshTokens).values({
    userId,
    token,
    expiresAt,
  });
};

// Cookie functions
export const setAuthCookies = (
  c: Context,
  accessToken: string,
  refreshToken: string,
) => {
  setCookie(c, "access_token", accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 60 * 15,
    path: "/",
  });

  setCookie(c, "refresh_token", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
};

export const clearAuthCookies = (c: Context) => {
  deleteCookie(c, "access_token", {
    path: "/",
  });

  deleteCookie(c, "refresh_token", {
    path: "/",
  });
};

/// Invite Code fn
const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ1234567890";
const codeGenerator = customAlphabet(alphabet, 10);
export const generateInviteCode = () => {
  return codeGenerator();
};
