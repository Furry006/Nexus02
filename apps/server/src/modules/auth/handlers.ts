import type { AppRouteHandler } from "#/openapi/index.js";
import type {
  SignUpRoute,
  LogInRoute,
  RefreshTokenRoute,
  LogoutRoute,
  ChangePasswordRoute,
} from "./routes.js";
import { HttpResponse, HttpStatus } from "#/utils/http/index.js";
import { signUp, logIn, logout, refreshToken, changePassword } from "./services.js";
import { setAuthCookies } from "#/utils/helpers.js";
import { getCookie } from "hono/cookie";

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
  const token = getCookie(c, "refresh_token");

  if (!token) {
    return c.json(
      {
        success: false,
        message: "Refresh token missing",
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await refreshToken(token);

  setAuthCookies(c, accessToken, newRefreshToken);

  return c.json(
    {
      success: true,
      message: "Token refreshed successfully",
    },
    HttpStatus.OK,
  );
};

export const changePasswordHandler: AppRouteHandler<ChangePasswordRoute> = async (
  c,
) => {
  const body = c.req.valid("json" as never);

  const user = c.get("user") as { id: string };

  const result = await changePassword(user.id, body);

  return c.json(result, HttpStatus.OK);
};