import type { AppRouteHandler } from "#/openapi/index.js";
import type { CreateChannelRoute } from "./routes.js";
import { HttpResponse, HttpStatus, HttpError } from "#/utils/http/index.js";
import { createChannel } from "./services.js";

export const createChannelHandler: AppRouteHandler<CreateChannelRoute> = async (
  ctx,
) => {
  const user = ctx.get("user");
  console.log("user from ctx:", user);
  if (!user) {
    throw new HttpError(
      HttpStatus.UNAUTHORIZED,
      "Unauthorized",
    );
  }
  const { workspaceId } = ctx.req.valid("param");
  const body = ctx.req.valid("json");

  const channel = await createChannel({
    workspaceId,
    userId: user["id"] as string,
    ...body,
  });

  return HttpResponse.success(
    ctx,
    HttpStatus.CREATED,
    "Channel Created Successfully",
    channel,
  );
};