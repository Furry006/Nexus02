import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import env from "../configs/env.js";
import * as schemas from "./schemas/index.js";

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema: { ...schemas } });