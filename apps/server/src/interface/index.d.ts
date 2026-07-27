import type { AppVariables } from "#/openapi/types.ts";

declare module "hono" {
    interface ContextVariableMap extends AppVariables{};
}


