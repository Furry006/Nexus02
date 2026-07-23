import { Hono } from "hono";
import "dotenv/config";
import authRouter from "./routes/auth.routes";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Hello Nexus API server!",
  });
});



/// auth routes
app.route("/auth", authRouter);


export default {
  port: 3000,
  fetch: app.fetch,
};