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
import {
  createWorkspaceHandler,
  deleteWorkspaceHandler,
  updateWorkspaceHandler,
  getWorkspaceHandler,
  getMyWorkspaceHandler,
} from "./handlers.js";

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
    body: jsonContent(updateWorkspaceSchema, "update workspace payload"),
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

export const deleteWorkspaceRoute = createRoute({
  tags: Tags.Workspace,
  method: "delete",
  path: "/:workspaceId/delete",
  middleware: [authMiddleware],
  responses: {
    [HttpStatus.OK]: jsonContent(
      successSchema({
        message: "Workspace deleted successfully",
      }),
      "Workspace deleted successfully",
    ),
    [HttpStatus.UNAUTHORIZED]: jsonContent(
      errorSchema({
        message: "Unauthorized",
      }),
      HttpPhrases.UNAUTHORIZED,
    ),
    [HttpStatus.NOT_FOUND]: jsonContent(
      errorSchema({
        message: "Workspace not found",
      }),
      HttpPhrases.NOT_FOUND,
    ),
    [HttpStatus.FORBIDDEN]: jsonContent(
      errorSchema({
        message: "Forbidden",
      }),
      HttpPhrases.FORBIDDEN,
    ),
  },
});

export const getWorkspaceRoute = createRoute({
  tags: Tags.Workspace,
  method: "get",
  path: "/:workspaceId",
  middleware: [authMiddleware],
  responses: {
    [HttpStatus.OK]: jsonContent(
      successSchema({
        message: "Workspace fetched successfully",
      }),
      "Workspace fetched successfully",
    ),
    [HttpStatus.UNAUTHORIZED]: jsonContent(
      errorSchema({
        message: "Unauthorized",
      }),
      HttpPhrases.UNAUTHORIZED,
    ),
    [HttpStatus.FORBIDDEN]: jsonContent(
      errorSchema({
        message: "You are not a member of this workspace",
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

export const getMyWorkspaceRoute = createRoute({
  tags: Tags.Workspace,
  method: "get",
  path: "/my/workspaces",
  middleware: [authMiddleware],

  responses: {
    [HttpStatus.OK]: jsonContent(
      successSchema({
        message: "All workspaces successfully"
      }),
      "All Workspaces Fetched Successfully",
    ),
    [HttpStatus.UNAUTHORIZED]: jsonContent(
      errorSchema({
        message: "unauthorized to get workspaces"
      }),
      HttpPhrases.UNAUTHORIZED
    )
  }
});

export type CreateWorkspaceRoute = typeof createWorkspaceRoute;
export type UpdateWorkspaceRoute = typeof updateWorkspaceRoute;
export type DeleteWorkspaceRoute = typeof deleteWorkspaceRoute;
export type GetWorkspaceRoute = typeof getWorkspaceRoute;
export type GetMyWorkspaceRoute = typeof getMyWorkspaceRoute;
export const workspaceRoute = createRouter()
  .openapi(createWorkspaceRoute, createWorkspaceHandler)
  .openapi(updateWorkspaceRoute, updateWorkspaceHandler)
  .openapi(deleteWorkspaceRoute, deleteWorkspaceHandler)
  .openapi(getWorkspaceRoute, getWorkspaceHandler)
  .openapi(getMyWorkspaceRoute, getMyWorkspaceHandler )
