import { createRoute } from "@hono/zod-openapi";
import {
  createRouter,
  jsonContent,
  successSchema,
  Tags,
} from "#/openapi/index.js";
import { HttpStatus, HttpPhrases } from "#/utils/http/index.js";
import { registerSchema } from "./schemas.js";
import { signUpHandler } from "./handlers.js";

export const signUpRoute = createRoute({
  tags: Tags.Auth,
  method: "post",
  path: "/sign-up",

  request: {
    body: jsonContent(
      registerSchema,
      "Register user"
    ),
  },

  responses: {
    [HttpStatus.CREATED]: jsonContent(
      successSchema(),
      HttpPhrases.CREATED
    ),
  },
});

export type SignUpRoute = typeof signUpRoute;
export const authRoute = createRouter().openapi(signUpRoute, signUpHandler)