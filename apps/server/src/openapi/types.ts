import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Schema } from "hono";
import type { PinoLogger } from "hono-pino";

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  userId: string
};

export interface AppVariables {
  logger: PinoLogger;
  user: AuthUser;
}

export interface AppBindings {
  Variables: AppVariables;
}

export type AppOpenAPI<S extends Schema = Record<string, never>> = OpenAPIHono<AppBindings, S>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;