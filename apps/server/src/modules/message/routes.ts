import { createRoute } from "@hono/zod-openapi";
import {
  jsonContent,
  successSchema,
  errorSchema,
  Tags,
  createRouter,
} from "#/openapi/index.js";

import { HttpPhrases, HttpStatus } from "#/utils/http/index.js";
import { authMiddleware } from "#/middlewares/auth.js";

import { messageTargetParamSchema, createMessageSchema, getMessagesQuerySchema } from "./schemas.js";

import { createMessageHandler, getMessageHandler } from "./handlers.js";

export const createMessageRoute = createRoute({
  tags: Tags.Message,
  method: "post",
  path: "/{type}/{targetId}/message",
  middleware: [authMiddleware],
  request: {
    params: messageTargetParamSchema,

    body: jsonContent(createMessageSchema, "Create Message"),
  },
  responses: {
    [HttpStatus.CREATED]: jsonContent(successSchema(), HttpPhrases.CREATED),

    [HttpStatus.BAD_REQUEST]: jsonContent(
      errorSchema({
        message: "Invalid Request",
      }),
      HttpPhrases.BAD_REQUEST,
    ),

    [HttpStatus.UNAUTHORIZED]: jsonContent(
      errorSchema({
        message: "Unauthorized",
      }),
      HttpPhrases.UNAUTHORIZED,
    ),

    [HttpStatus.NOT_FOUND]: jsonContent(
      errorSchema({
        message: "Message target not found",
      }),
      HttpPhrases.NOT_FOUND,
    ),
  },
});

export const getMessageRoute = createRoute({
  tags: Tags.Message,
  method: "get",
  path: "/{type}/{targetId}",
  middleware: [authMiddleware],

  request: {
    params: messageTargetParamSchema,
    query: getMessagesQuerySchema,
  },
  responses: {
    [HttpStatus.OK]: jsonContent(
      successSchema(),
      HttpPhrases.OK,
    ),

    [HttpStatus.BAD_REQUEST]: jsonContent(
      errorSchema({
        message: "Invalid Request",
      }),
      HttpPhrases.BAD_REQUEST,
    ),

    [HttpStatus.UNAUTHORIZED]: jsonContent(
      errorSchema({
        message: "Unauthorized",
      }),
      HttpPhrases.UNAUTHORIZED,
    ),

    [HttpStatus.NOT_FOUND]: jsonContent(
      errorSchema({
        message: "Message target not found",
      }),
      HttpPhrases.NOT_FOUND,
    ),
  },
});


export type CreateMessageRoute = typeof createMessageRoute;
export type GetMessageRoute = typeof getMessageRoute;

export const messageRoute = createRouter()
  .openapi( createMessageRoute, createMessageHandler )
  .openapi( getMessageRoute, getMessageHandler );


