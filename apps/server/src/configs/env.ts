import { cleanEnv, num, port, str } from "envalid";
import "dotenv/config";

const env = cleanEnv(process.env, {
  DATABASE_URL: str({
    default: "postgresql://postgres:postgres@localhost:5432/nexus",
  }),
  ACCESS_SECRET: str({
    default: "super-secret-access-token-key-nexus-2026",
  }),
  ACCESS_EXPIRY: num({ default: 900 }),
  REFRESH_SECRET: str({
    default: "super-secret-refresh-token-key-nexus-2026",
  }),
  REFRESH_EXPIRY: num({ default: 604800 }),

  CLOUDINARY_CLOUD_NAME: str({ default: "demo" }),
  CLOUDINARY_API_KEY: str({ default: "1234567890" }),
  CLOUDINARY_API_SECRET: str({ default: "secret" }),

  BODY_LIMIT: num({ default: 10 }),
  CORS_ORIGIN: str({ default: "http://localhost:5173" }),
  PORT: port({ default: 5000 }),
  NODE_ENV: str({
    choices: ["development", "production"],
    default: "development",
  }),
  LOG_LEVEL: str({
    choices: ["fatal", "error", "warn", "info", "debug", "trace", "silent"],
    default: "trace",
  }),
});

export default env;
