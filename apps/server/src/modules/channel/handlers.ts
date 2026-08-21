import type { AppRouteHandler } from "#/openapi/index.js";
import type { CreateChannelRoute } from "./routes.js";

import { createChannelService } from "./services.js";
import { HttpResponse, HttpStatus } from "#/utils/http/index.js";

export const createChannelHandler: AppRouteHandler<CreateChannelRoute> = async (c) => {
  const { workspaceId } = c.req.valid("param");
  const body = c.req.valid("json");

  const user = c.get("user");

  const channel = await createChannelService({
    workspaceId,
    userId: user["id"] as string,
    ...body,
  });

  return HttpResponse.success(
    c,
    HttpStatus.CREATED,
    "Channel created successfully",
    channel,
  );
};