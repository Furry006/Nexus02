import type { AppRouteHandler } from "#/openapi/index.js";
import type { ChangePasswordRoute } from "./routes.js";
import { HttpStatus } from "#/utils/http/index.js";
import { changePassword } from "./services.js";

export const changePasswordHandler: AppRouteHandler<
  ChangePasswordRoute
> = async (c) => {
  const body = c.req.valid("json" as never);

  const user = c.get("user") as { id?: string } | undefined;

  if (!user?.id) {
    return c.json(
      {
        success: false,
        message: "Unauthorized",
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  const result = await changePassword(user.id, body);

  return c.json(result, HttpStatus.OK);
};
