import { createRoute, z } from "@hono/zod-openapi";

import {
  createRouter,
  successSchema,
  jsonContent,
  type AppRouteHandler,
  queryParams,
} from "#/openapi/index.js";

import { HttpPhrases, HttpResponse, HttpStatus } from "#/utils/http/index.js";

import { authRoute } from "./auth/routes.js";
import { userRoute } from "./user/routes.js";
import { workspaceRoute } from "./workspace/routes.js";

const helloRoute = createRoute({
  tags: ["Hello"],
  method: "get",
  path: "/hello",
  request: {
    query: z.object({
      name: queryParams.optional(
        "name",
        z.string().min(1).default("jerk"),
        "jerk",
      ),
    }),
  },
  responses: {
    [HttpStatus.OK]: jsonContent(successSchema(), HttpPhrases.OK),
  },
});

const helloHandler: AppRouteHandler<typeof helloRoute> = (ctx) => {
  const { name } = ctx.req.valid("query");

  return HttpResponse.success(ctx, HttpStatus.OK, "hello is working", name);
};

const router = createRouter();

router.openapi(helloRoute, helloHandler);

// Modules
router.route("/auth", authRoute);
router.route("/user", userRoute);
router.route("/workspace", workspaceRoute);

export default router;
