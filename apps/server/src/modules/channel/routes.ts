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
import { createChannelSchema, workspaceIdParamSchema } from "./schemas.js";
import { createChannelHandler } from "./handlers.js";


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
        )
    },
});

export type CreateChannelRoute = typeof createChannelRoute;
export const channelRoute = createRouter()
    .openapi( createChannelRoute, createChannelHandler)
  

