import type { AppRouteHandler } from "#/openapi/index.js";
import type {
  CreateWorkspaceRoute,
  DeleteWorkspaceRoute,
  GetWorkspaceRoute,
  UpdateWorkspaceRoute,
  GetMyWorkspaceRoute,
  JoinWorkspaceRoute,
} from "./routes.js";
import { HttpResponse, HttpStatus } from "#/utils/http/index.js";
import {
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  getWorkspace,
  getMyWorkspace,
  joinWorkspace,
} from "./services.js";

export const createWorkspaceHandler: AppRouteHandler<CreateWorkspaceRoute> = async (c) => {
  const body = c.req.valid("json");

  const user = c.get("user") as { id: string } | undefined;

  if (!user?.id) {
    return HttpResponse.error(c, HttpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const workspace = await createWorkspace({
    ...body,
    ownerId: user.id,
  });

  return HttpResponse.success(
    c,
    HttpStatus.CREATED,
    "Workspace created successfully",
    workspace,
  );
};

export const updateWorkspaceHandler: AppRouteHandler<UpdateWorkspaceRoute> = async (c) => {
  const body = c.req.valid("json");
  const { workspaceId } = c.req.param();

  const user = c.get("user") as { id: string } | undefined;

  if (!user?.id) {
    return HttpResponse.error(c, HttpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const workspace = await updateWorkspace({
    workspaceId,
    userId: user.id,
    ...body,
  });

  return HttpResponse.success(
    c,
    HttpStatus.OK,
    "Workspace updated successfully",
    workspace,
  );
};

export const deleteWorkspaceHandler: AppRouteHandler<DeleteWorkspaceRoute> = async (c) => {
  const { workspaceId } = c.req.param();
  const user = c.get("user") as { id: string } | undefined;
  if (!user?.id) {
    return HttpResponse.error(c, HttpStatus.UNAUTHORIZED, "Unauthorized");
  }
  await deleteWorkspace({
    workspaceId,
    userId: user.id,
  });
  return HttpResponse.success(
    c,
    HttpStatus.OK,
    "Workspace delete successfully",
  );
};

export const getWorkspaceHandler: AppRouteHandler<GetWorkspaceRoute> = async (
  c,
) => {
  const { workspaceId } = c.req.param();

  const user = c.get("user") as { id: string } | undefined;
  if (!user?.id) {
    return HttpResponse.error(c, HttpStatus.UNAUTHORIZED, "unauthorized");
  }

  const workspace = await getWorkspace({
    workspaceId,
    userId: user.id,
  });

  return HttpResponse.success(
    c,
    HttpStatus.OK,
    "Workspace fetched successfully",
    workspace,
  );
};

export const getMyWorkspaceHandler: AppRouteHandler<GetMyWorkspaceRoute> = async (c) => {
  const user = c.get("user") as { id: string };

  const workspaces = await getMyWorkspace(user.id);

  return HttpResponse.success(
    c,
    HttpStatus.OK,
    "Workspace fetched successfully",
    workspaces,
  );
};

export const joinWorkspaceHandler: AppRouteHandler<JoinWorkspaceRoute> = async (c) => {
  const body = c.req.valid("json");

  const user = c.get("user") as { id: string } | undefined;

  if (!user?.id) {
    return HttpResponse.error(c, HttpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const workspace = await joinWorkspace({
    inviteCode: body.inviteCode,
    userId: user.id,
  });

  return HttpResponse.success(
    c,
    HttpStatus.OK,
    "Workspace joined successfully",
    workspace,
  );
};