import jwt from "jsonwebtoken";
import { ApiError } from "./ApiError";
import type { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  userId: string;
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
  });
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  });
}

export function verifyAccessToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
  if (typeof decoded === "string") {
    throw new ApiError(401, "Invalid access token payload");
  }
  return decoded as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
  if (typeof decoded === "string") {
    throw new ApiError(401, "Invalid refresh token payload");
  }
  return decoded as TokenPayload;
}
