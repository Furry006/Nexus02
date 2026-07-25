import { createRoute } from "@hono/zod-openapi";
import {
  createRouter,
  jsonContent,
  successSchema,
  Tags,
} from "#/openapi/index.js";
import { HttpStatus, HttpPhrases } from "#/utils/http/index.js";
import { loginSchema, registerSchema } from "./schemas.js";
import {
  logInHandler,
  logoutHandler,
  refreshTokenHandler,
  signUpHandler,
} from "./handlers.js";

export const signUpRoute = createRoute({
  tags: Tags.Auth,
  method: "post",
  path: "/signup",

  request: {
    body: jsonContent(registerSchema, "Register user"),
  },

  responses: {
    [HttpStatus.CREATED]: jsonContent(successSchema(), HttpPhrases.CREATED),
  },
});

export const logInRoute = createRoute({
  tags: Tags.Auth,
  method: "post",
  path: "/login",
  request: {
    body: jsonContent(loginSchema, "User Login"),
  },
  responses: {
    [HttpStatus.ACCEPTED]: jsonContent(successSchema(), HttpPhrases.ACCEPTED),
  },
});

export const logoutRoute = createRoute({
  tags: Tags.Auth,
  method: "post",
  path: "/logout",

  responses: {
    [HttpStatus.OK]: jsonContent(successSchema(), HttpPhrases.OK),
  },
});

export const refreshTokenRoute = createRoute({
  tags: Tags.Auth,
  method: "get",
  path: "/",
  responses: {
    [HttpStatus.OK]: jsonContent(successSchema(), HttpPhrases.OK),
  },
});

export type LogoutRoute = typeof logoutRoute;
export type SignUpRoute = typeof signUpRoute;
export type LogInRoute = typeof logInRoute;
export type RefreshTokenRoute = typeof refreshTokenRoute;
export const authRoute = createRouter()
  .openapi(signUpRoute, signUpHandler)
  .openapi(logInRoute, logInHandler)
  .openapi(logoutRoute, logoutHandler)
  .openapi(refreshTokenRoute, refreshTokenHandler);
