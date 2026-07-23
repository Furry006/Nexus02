import app from "#/app.js";
import env from "#/configs/env.js";
import { logger } from "#/middlewares/logger.js";

void (async () => {
  try {
    const server = Bun.serve({
      fetch: (request, server) => {
        if (env.isDev) {
          const ip = server.requestIP(request)?.address;

          if (ip) {
            request.headers.set("x-client-ip", ip);
          }
        }
        return app.fetch(request, server);
      },
      port: env.PORT,
      maxRequestBodySize: env.BODY_LIMIT * 1024 * 1024,
    });

    logger.info("Server is running at: %s", server.url);
  } catch (err) {
    logger.error({ err }, "Server startup failed!");
    process.exit(1);
  }
})();
