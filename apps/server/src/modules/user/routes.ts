import { createRoute } from "@hono/zod-openapi";
import {
  createRouter,
  jsonContent,
  successSchema,
  errorSchema,
  Tags,
  jsonRequired,
} from "#/openapi/index.js";
import { HttpStatus, HttpPhrases } from "#/utils/http/index.js";
import { authMiddleware } from "#/middlewares/auth.js";
import { changePasswordHandler, getMeHandler } from "./handlers.js";
import { changePasswordSchema } from "./schemas.js";

export const getMeRoute = createRoute({
  tags: Tags.User,
  method: "get",
  path: "/me",
  middleware: [authMiddleware],
  responses: {
    [HttpStatus.OK]: jsonContent(
      successSchema({
        message: "User find",
      }),
      HttpPhrases.OK,
    ),
    [HttpStatus.UNAUTHORIZED]: jsonContent(
      errorSchema({
        message: "Unauthorized",
      }),
      HttpPhrases.UNAUTHORIZED,
    ),
  },
});

export const changePasswordRoute = createRoute({
  tags: Tags.User,
  method: "patch",
  path: "/change-password",
  middleware: [authMiddleware],
  request: {
    body: jsonRequired(changePasswordSchema, "Change password payload")
  },
  responses: {
    [HttpStatus.OK]: jsonContent(
      successSchema({
        message: "Password Changed Successfully",
      }),
      HttpPhrases.OK,
    ),
    [HttpStatus.UNAUTHORIZED]: jsonContent(
      errorSchema({
        message: "Password is inccorrect",
      }),
      HttpPhrases.UNAUTHORIZED,
    ),
  },
});

export type ChangePasswordRoute = typeof changePasswordRoute;
export type GetMeRoute = typeof getMeRoute;
export const userRoute = createRouter()
  .openapi(changePasswordRoute, changePasswordHandler)
  .openapi(getMeRoute, getMeHandler);
