import { createRoute } from "@hono/zod-openapi";
import {
  createRouter,
  jsonContent,
  successSchema,
  errorSchema,
  Tags,
} from "#/openapi/index.js";
import { HttpPhrases, HttpStatus } from "#/utils/http/index.js";
import { createWorkspaceSchema } from "./schemas.js";
import { createWorkspaceHandler } from "./handlers.js";

export const createWorkspaceRoute = createRoute({
  tags: Tags.Workspace,
  method: "post",
  path: "/",

  request: {
    body: jsonContent(createWorkspaceSchema, "Create workspace payload"),
  },

  responses: {
    [HttpStatus.CREATED]: jsonContent(
      successSchema({
        message: "Workspace created successfully",
      }),
      HttpPhrases.CREATED,
    ),
    [HttpStatus.UNAUTHORIZED]: jsonContent(
      errorSchema({
        message: "Unauthorized",
      }),
      HttpPhrases.UNAUTHORIZED,
    ),
  },
});

export type CreateWorkspaceRoute = typeof createWorkspaceRoute;

export const workspaceRoute = createRouter().openapi(
  createWorkspaceRoute,
  createWorkspaceHandler,
);
