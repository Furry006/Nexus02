import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";

import { verifyAccessToken } from "#/utils/helpers.js";
import { HttpError, HttpStatus } from "#/utils/http/index.js";

export const authMiddleware = createMiddleware(async (c, next) => {
  const token = getCookie(c, "access_token");

  if (!token) {
    throw new HttpError(HttpStatus.UNAUTHORIZED, "Unauthorized");
  }

  try {
    const payload = await verifyAccessToken(token);

    c.set("user", {
      id: payload["id"] as string,
      email: payload["email"] as string,
    });

    await next();
  } catch {
    throw new HttpError(HttpStatus.UNAUTHORIZED, "Invalid or expired access token");
  }
});

