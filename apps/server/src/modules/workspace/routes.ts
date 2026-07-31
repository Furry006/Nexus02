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
  createWorkspaceSchema,
  joinWorkspaceSchema,
  updateWorkspaceSchema,
  workspaceParamsSchema,
} from "./schemas.js";
import {
  createWorkspaceHandler,
  deleteWorkspaceHandler,
  updateWorkspaceHandler,
  getWorkspaceHandler,
  getMyWorkspaceHandler,
  joinWorkspaceHandler,
  leaveWorkspaceHandler,
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
  path: "/my",
  middleware: [authMiddleware],

  responses: {
    [HttpStatus.OK]: jsonContent(
      successSchema({
        message: "All workspaces successfully",
      }),
      "All Workspaces Fetched Successfully",
    ),
    [HttpStatus.UNAUTHORIZED]: jsonContent(
      errorSchema({
        message: "unauthorized to get workspaces",
      }),
      HttpPhrases.UNAUTHORIZED,
    ),
  },
});

export const joinWorkspaceRoute = createRoute({
  tags: Tags.Workspace,
  method: "post",
  path: "/join/:workspaceId",
  middleware: [authMiddleware],
  request: {
    body: jsonContent(joinWorkspaceSchema, "Join workspace payload"),
  },

  responses: {
    [HttpStatus.OK]: jsonContent(
      successSchema({
        message: "Success",
      }),
      "join workspace successfully",
    ),
    [HttpStatus.UNAUTHORIZED]: jsonContent(
      errorSchema({
        message: "Not allowed to join this workspace",
      }),
      HttpPhrases.UNAUTHORIZED,
    ),
  },
});

export const leaveWorkspaceRoute = createRoute({
  tags: Tags.Workspace,
  method: "post",
  path: "/leave/:workspaceId",
  middleware: [authMiddleware],

  request: {
    params: workspaceParamsSchema,
  },

  responses: {
    [HttpStatus.OK]: jsonContent(
      successSchema({
        message: "Left workspace successfully",
      }),
      "Left workspace successfully",
    ),
    [HttpStatus.UNAUTHORIZED]: jsonContent(
      errorSchema({
        message: "Unauthorized",
      }),
      "Unauthorized",
    ),
    [HttpStatus.NOT_FOUND]: jsonContent(
      errorSchema({
        message: "Workspace or membership not found",
      }),
      "Workspace or membership not found",
    ),
    [HttpStatus.CONFLICT]: jsonContent(
      errorSchema({
        message: "Owner cannot leave the workspace",
      }),
      "Owner cannot leave the workspace",
    ),
    [HttpStatus.INTERNAL_SERVER_ERROR]: jsonContent(
      errorSchema({
        message: "Something went wrong",
      }),
      "Internal server error",
    ),
  },
});

export type CreateWorkspaceRoute = typeof createWorkspaceRoute;
export type UpdateWorkspaceRoute = typeof updateWorkspaceRoute;
export type DeleteWorkspaceRoute = typeof deleteWorkspaceRoute;
export type GetWorkspaceRoute = typeof getWorkspaceRoute;
export type GetMyWorkspaceRoute = typeof getMyWorkspaceRoute;
export type JoinWorkspaceRoute = typeof joinWorkspaceRoute;
export type LeaveWorkspaceRoute = typeof leaveWorkspaceRoute;
export const workspaceRoute = createRouter()
  .openapi(createWorkspaceRoute, createWorkspaceHandler)
  .openapi(updateWorkspaceRoute, updateWorkspaceHandler)
  .openapi(deleteWorkspaceRoute, deleteWorkspaceHandler)
  .openapi(getWorkspaceRoute, getWorkspaceHandler)
  .openapi(getMyWorkspaceRoute, getMyWorkspaceHandler)
  .openapi(joinWorkspaceRoute, joinWorkspaceHandler)
  .openapi(leaveWorkspaceRoute, leaveWorkspaceHandler);
