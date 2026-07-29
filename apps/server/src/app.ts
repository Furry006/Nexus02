import { bodyLimit } from "hono/body-limit";
import { cors } from "hono/cors";
import { requestId } from "hono/request-id";
import { pinoLogger } from "hono-pino";
import { ZodError } from "zod";
import env from "#/configs/env.js";
import { logger } from "#/middlewares/logger.js";
import { configOpenAPI, createRouter } from "#/openapi/index.js";
import routes from "#/modules/index.js";
import { HttpError, HttpResponse, HttpStatus } from "#/utils/http/index.js";

const app = createRouter();

app.use(requestId());
app.use(pinoLogger({ pino: logger }));

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
    maxAge: 3600,
  }),
);

app.use(
  bodyLimit({
    maxSize: env.BODY_LIMIT * 1024 * 1024,
    onError: (ctx) => {
      return HttpResponse.error(
        ctx,
        HttpStatus.REQUEST_TOO_LONG,
        "Request payload is too large!",
      );
    },
  }),
);

app.all("/", (ctx) => {
  if (env.isProd) return ctx.redirect(env.CORS_ORIGIN);

  return HttpResponse.success(ctx, HttpStatus.OK, "Bun + Hono says hello!");
});

configOpenAPI(app);

// Register all modules once
app.route("/api", routes);

app.onError((err, ctx) => {
  if (err instanceof HttpError) {
    return HttpResponse.error(ctx, err.status, err.message);
  }

  if (err instanceof ZodError) {
    return HttpResponse.error(
      ctx,
      HttpStatus.UNPROCESSABLE_ENTITY,
      "Validation error occurred!",
      err.issues,
    );
  }

  if (
    err instanceof SyntaxError &&
    /JSON|Unexpected token|Unexpected end of JSON/.test(err.message)
  ) {
    return HttpResponse.error(
      ctx,
      HttpStatus.BAD_REQUEST,
      "Invalid JSON payload",
    );
  }

  ctx.var.logger.error({ err }, "Unhandled server error!");

  return HttpResponse.error(
    ctx,
    HttpStatus.INTERNAL_SERVER_ERROR,
    "Internal server error!",
  );
});

app.notFound((ctx) => {
  return HttpResponse.error(
    ctx,
    HttpStatus.NOT_FOUND,
    `Requested url '${ctx.req.path}' not found on the server!`,
  );
});

export default app;
