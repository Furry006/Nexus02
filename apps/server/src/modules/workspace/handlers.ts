import type { AppRouteHandler } from "#/openapi/index.js";
import type { CreateWorkspaceRoute } from "./routes.js";
import { HttpResponse, HttpStatus } from "#/utils/http/index.js";

export const createWorkspaceHandler: AppRouteHandler<
  CreateWorkspaceRoute
> = async (c) => {
  const body = c.req.valid("json");

  const user = c.get("user");

  const workspace = await createWorkspace({
    ...body,
    ownerId: user["id"],
  });

  return HttpResponse.success(
    c,
    HttpStatus.CREATED,
    "Workspace created successfully",
    workspace,
  );
};

