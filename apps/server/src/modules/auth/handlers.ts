import type { AppRouteHandler } from "#/openapi/index.js";
import type {
  SignUpRoute,
  LogInRoute,
  RefreshTokenRoute,
  LogoutRoute,
} from "./routes.js";
import { HttpResponse, HttpStatus } from "#/utils/http/index.js";
import { signUp, logIn, logout, refreshToken } from "./services.js";
import { setAuthCookies } from "#/utils/helpers.js";

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

export const logoutHandler: AppRouteHandler<LogoutRoute> = async (ctx) => {
  const response = await logout(ctx);

  return ctx.json(response, HttpStatus.OK);
};

export const refreshTokenHandler: AppRouteHandler<RefreshTokenRoute> = async (
  c,
) => {
  const token = c.req.cookie("refresh_token");

  const { accessToken, refreshToken: newRefreshToken } =
    await refreshToken(token);

  await setAuthCookies(c, accessToken, newRefreshToken);
  return c.json(
    {
      success: true,
    },
    HttpStatus.OK,
  );
};
