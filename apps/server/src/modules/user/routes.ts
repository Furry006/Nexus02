import { createRoute } from "@hono/zod-openapi";
import {
  createRouter,
  jsonContent,
  successSchema,
  errorSchema,
  Tags,
} from "#/openapi/index.js";
import { HttpStatus, HttpPhrases } from "#/utils/http/index.js";
import { changePasswordHandler } from "./handlers.js";

export const changePasswordRoute = createRoute({
  tags: Tags.User,
  method: "patch",
  path: "/change-password",
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
export const userRoute = createRouter().openapi(changePasswordRoute, changePasswordHandler);
