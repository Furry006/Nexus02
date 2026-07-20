import { Hono } from "hono";
import "dotenv/config";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Hello Nexus API server!",
  });
});



export default {
  port: 3000,
  fetch: app.fetch,
};