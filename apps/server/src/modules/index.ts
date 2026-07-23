import { createRoute, z } from "@hono/zod-openapi";
import {
  createRouter,
  successSchema,
  jsonContent,
  type AppRouteHandler,
  queryParams,
} from "#/openapi/index.js";
import { HttpResponse, HttpPhrases, HttpStatus } from "#/utils/http/index.js";
import { authRoute } from "./auth/routes.js";

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

const router = createRouter()

router.openapi(helloRoute, helloHandler)
router.route("/auth", authRoute)

export default router;