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
import { createWorkspaceSchema, updateWorkspaceSchema } from "./schemas.js";
import { createWorkspaceHandler, updateWorkspaceHandler } from "./handlers.js";

export const createWorkspaceRoute = createRoute({
  tags: Tags.Workspace,
  method: "post",
  path: "/create",
  middleware: [authMiddleware],

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

export const updateWorkspaceRoute = createRoute({
  tags: Tags.Workspace,
  method: "patch",
  path: "/:workspaceId/update",
  middleware: [authMiddleware],
  request: {
    body: jsonContent(updateWorkspaceSchema, "update workspace payload")
  },
  responses: {
    [HttpStatus.OK]: jsonContent(
      successSchema({
        message: "Workspace Updated Successfully",
      }),
      HttpPhrases.OK,
    ),
    [HttpStatus.UNAUTHORIZED]: jsonContent(
      errorSchema({
        message: "Unauthorized user",
      }),
      HttpPhrases.UNAUTHORIZED,
    ),
  },
});

export type CreateWorkspaceRoute = typeof createWorkspaceRoute;
export type UpdateWorkspaceRoute = typeof updateWorkspaceRoute;
export const workspaceRoute = createRouter()
.openapi( createWorkspaceRoute, createWorkspaceHandler)
.openapi(updateWorkspaceRoute, updateWorkspaceHandler)
