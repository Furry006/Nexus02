import { Scalar } from "@scalar/hono-api-reference";
import type { AppOpenAPI } from "./types.js";

const configOptions = {
  openapi: "3.1.0",
  info: {
    title: "Nexus",
    description: "Lightweight backend for Nexus.",
    contact: {
      name: "Nexus",
      url: "http://localhost:6173",
      email: "Nexus@google.com",
    },

    license: {
      name: "MIT",
    },
    version: "1.1.0",
  },
  servers: [{ url: "/" }],
};

export const configOpenAPI = (app: AppOpenAPI) => {
  app.doc("/openapi.json", { ...configOptions });

  app.get("/docs", (ctx) => ctx.redirect("/reference", 301));

  app.get(
    "/reference",
    Scalar({
      url: "/openapi.json",
      pageTitle: configOptions.info.title,
      theme: "saturn",
      layout: "modern",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
    }),
  );
};