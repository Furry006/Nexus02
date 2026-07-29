import type { AppRouteHandler } from "#/openapi/index.js";
import type { CreateWorkspaceRoute } from "./routes.js";
import { HttpResponse, HttpStatus } from "#/utils/http/index.js";
import { createWorkspace } from "./services.js";

export const createWorkspaceHandler: AppRouteHandler<CreateWorkspaceRoute> = async (c) => {
  const body = c.req.valid("json");

  const user = c.get("user") as { id: string } | undefined;

  if (!user?.id) {
    return HttpResponse.error(
      c,
      HttpStatus.UNAUTHORIZED,
      "Unauthorized",
    );
  }

  const workspace = await createWorkspace({
    ...body,
    ownerId: user.id,
    description: body.description ?? "",
  });

  return HttpResponse.success(
    c,
    HttpStatus.CREATED,
    "Workspace created successfully",
    workspace,
  );
};
