import { cleanEnv, num, port, str, url } from "envalid";
import "dotenv/config";

const env = cleanEnv(process.env, {
  DATABASE_URL: url(),
  ACCESS_SECRET: str(),
  ACCESS_EXPIRY: num(),
  REFRESH_SECRET: str(),
  REFRESH_EXPIRY: num(),

  AWS_BUCKET_ACCESS: str(),
  AWS_BUCKET_SECRET: str(),
  AWS_REGION: str(),
  AWS_BUCKET_NAME: str(),

  BODY_LIMIT: num(),
  CORS_ORIGIN: str(),
  PORT: port(),
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
