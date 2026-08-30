import type { AppRouteHandler } from "#/openapi/index.js";
import type { CreateMessageRoute } from "./routes.js";

import { HttpResponse, HttpStatus } from "#/utils/http/index.js";
import { createMessage } from "./service.js";

export const createMessageHandler: AppRouteHandler<CreateMessageRoute> = async (
  ctx,
) => {
  const { type, targetId } = ctx.req.valid("param");
  const { content } = ctx.req.valid("json");

  const user = ctx.get("user");

  const message = await createMessage({
    type,
    targetId,
    userId: user["id"] as string,
    content,
  });

  return HttpResponse.success(
    ctx,
    HttpStatus.CREATED,
    "Message Created Successfully",
    message,
  );
};
