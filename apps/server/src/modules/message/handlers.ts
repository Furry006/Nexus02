import type { AppRouteHandler } from "#/openapi/index.js";
import type { CreateMessageRoute, GetMessageRoute } from "./routes.js";

import { HttpResponse, HttpStatus } from "#/utils/http/index.js";
import { createMessage, getMessages } from "./service.js";

export const createMessageHandler: AppRouteHandler<CreateMessageRoute> = async (
  ctx,
) => {
  const { type, targetId } = ctx.req.valid("param");
  const { content } = ctx.req.valid("json");

  const user = ctx.get("user");

  const message = await createMessage({
    type,
    targetId,
    userId: user.id,
    content,
  });

  return HttpResponse.success(
    ctx,
    HttpStatus.CREATED,
    "Message Created Successfully",
    message,
  );
};

export const getMessageHandler: AppRouteHandler<GetMessageRoute> = async ( ctx ) => {
  const { type, targetId } = ctx.req.valid("param");
  const { limit, beforeCreatedAt, beforeId } = ctx.req.valid("query");
  const user = ctx.get("user");

  const result = await getMessages({
    type,
    targetId,
    userId: user.id,
    limit,
    ...(beforeCreatedAt !== undefined && { beforeCreatedAt }),
    ...(beforeId !== undefined && { beforeId }),
  });

  return HttpResponse.success(
    ctx,
    HttpStatus.OK,
    "Messages Fetched Successfully",
    result,
  );
};
