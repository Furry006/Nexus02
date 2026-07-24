import type { AppRouteHandler } from "#/openapi/index.js";
import type { SignUpRoute, LogInRoute } from "./routes.js";
import { HttpResponse, HttpStatus } from "#/utils/http/index.js";
import { signUp, logIn } from "./services.js";

export const signUpHandler: AppRouteHandler<SignUpRoute> = async (ctx) => {
  const body = ctx.req.valid("json");

  const user = await signUp(body);

  return HttpResponse.success(
    ctx,
    HttpStatus.CREATED,
    "Account Created Successfully",
    user,
  );
};

export const logInHandler: AppRouteHandler<LogInRoute> = async (ctx) => {
  const body = ctx.req.valid("json");

  const result = await logIn(body, ctx);

  return ctx.json(result, HttpStatus.ACCEPTED);
};

export const logoutHandler = async (ctx) => {
  const response = await logout(ctx);

  return ctx.json(response, HttpStatus.OK);
};


