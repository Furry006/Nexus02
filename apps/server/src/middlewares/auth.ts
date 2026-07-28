import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";

import { verifyAccessToken } from "#/utils/helpers.js";
import { HttpStatus } from "#/utils/http/index.js";

export const authMiddleware = createMiddleware(async (c, next) => {
  const token = getCookie(c, "access_token");

  if (!token) {
    throw new HTTPException(HttpStatus.UNAUTHORIZED, {
      message: "Unauthorized",
    });
  }

  try {
    const payload = await verifyAccessToken(token);

    c.set("user", {
      id: payload["id"] as string,
      email: payload["email"] as string,
    });

    await next();
  } catch {
    throw new HTTPException(HttpStatus.UNAUTHORIZED, {
      message: "Invalid or expired access token",
    });
  }
});

