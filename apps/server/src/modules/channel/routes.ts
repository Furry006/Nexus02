import { createRoute } from "@hono/zod-openapi";
import {
  createRouter,
  jsonContent,
  successSchema,
  errorSchema,
  Tags,
} from "#/openapi/index.js";
import { HttpPhrases, HttpStatus } from "#/utils/http/index.js";
import { authMiddleware } from "#/middlewares/auth.js";
import {
  createChannelSchema,
  updateChannelSchema,
  workspaceIdParamSchema,
  workspaceChannelParamSchema,
} from "./schemas.js";
import {
  createChannelHandler,
  deleteChannelHandler,
  getWorkspaceChannelHandler,
  updateChannelHandler,
} from "./handlers.js";

export const createChannelRoute = createRoute({
  tags: Tags.Channel,
  method: "post",
  path: "/workspace/{workspaceId}/create",
  middleware: [authMiddleware],
  request: {
    params: workspaceIdParamSchema,
    body: jsonContent(createChannelSchema, "Create Channel"),
  },
  responses: {
    [HttpStatus.CREATED]: jsonContent(
      successSchema({
        message: "Channel Created Successfully",
      }),
      HttpPhrases.CREATED,
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
    [HttpStatus.INTERNAL_SERVER_ERROR]: jsonContent(
      errorSchema({
        message: "Internal Server Error",
      }),
      HttpPhrases.INTERNAL_SERVER_ERROR,
    ),
    [HttpStatus.FORBIDDEN]: jsonContent(
      errorSchema({
        message: "You are not allowed to create a channel",
      }),
      HttpPhrases.FORBIDDEN,
    ),
    [HttpStatus.NOT_FOUND]: jsonContent(
      errorSchema({
        message: "Workspace not found",
      }),
      HttpPhrases.NOT_FOUND,
    ),
  },
});

export const getWorkspaceChannelRoute = createRoute({
  tags: Tags.Channel,
  method: "get",
  path: "/workspace/{workspaceId}/channel",
  middleware: [authMiddleware],
  request: {
    params: workspaceIdParamSchema,
  },
  responses: {
    [HttpStatus.OK]: jsonContent(
      successSchema({
        message: "Channel Fetched Successfully",
      }),
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
    [HttpStatus.INTERNAL_SERVER_ERROR]: jsonContent(
      errorSchema({
        message: "Internal Server Error",
      }),
      HttpPhrases.INTERNAL_SERVER_ERROR,
    ),
    [HttpStatus.NOT_FOUND]: jsonContent(
      errorSchema({
        message: "Channel not found",
      }),
      HttpPhrases.NOT_FOUND,
    ),
  },
});

export const updateChannelRoute = createRoute({
  tags: Tags.Channel,
  method: "patch",
  path: "/workspace/{workspaceId}/channel/{channelId}",
  middleware: [authMiddleware],
  request: {
    params: workspaceChannelParamSchema,
    body: jsonContent(updateChannelSchema, "update Channel"),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(successSchema(), HttpPhrases.OK),

    [HttpStatus.BAD_REQUEST]: jsonContent(
      errorSchema({
        message: "Invalid request",
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
        message: "Channel not found",
      }),
      HttpPhrases.NOT_FOUND,
    ),
  },
});

export const deleteChannelRoute = createRoute({
  tags: Tags.Channel,
  method: "delete",
  path: "/workspace/{workspaceId}/channel/{channelId}",
  middleware: [authMiddleware],
  request: {
    params: workspaceChannelParamSchema,
  },
  responses: {
    [HttpStatus.OK]: jsonContent(successSchema(), HttpPhrases.OK),

    [HttpStatus.BAD_REQUEST]: jsonContent(
      errorSchema({
        message: "Invalid Request",
      }),
      HttpPhrases.BAD_REQUEST,
    ),

    [HttpStatus.NOT_FOUND]: jsonContent(
      errorSchema({
        message: "Channel not found",
      }),
      HttpPhrases.NOT_FOUND,
    ),
  },
});

export type CreateChannelRoute = typeof createChannelRoute;
export type GetWorkspaceChannel = typeof getWorkspaceChannelRoute;
export type UpdateChannelRoute = typeof updateChannelRoute;
export type DeleteChannelRoute = typeof deleteChannelRoute;

export const channelRoute = createRouter()
  .openapi(createChannelRoute, createChannelHandler)
  .openapi(getWorkspaceChannelRoute, getWorkspaceChannelHandler)
  .openapi(updateChannelRoute, updateChannelHandler)
  .openapi(deleteChannelRoute, deleteChannelHandler);
