import type { AppRouteHandler } from "#/openapi/index.js";
import type { CreateChannelRoute } from "./routes.js";
import { HttpResponse, HttpStatus } from "#/utils/http/index.js";
import { createChannel } from "./services.js";

export const createChannelHandler: AppRouteHandler<CreateChannelRoute> = async (
  ctx,
) => {
  const { workspaceId } = ctx.req.valid("param");
  const body = ctx.req.valid("json");

  const user = ctx.get("user");

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