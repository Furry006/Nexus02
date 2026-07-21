import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { register } from "../controllers/auth.controller";
import { registerSchema } from "../schemas/auth.schema";

const authRouter = new Hono();

authRouter.post("/register", zValidator("json", registerSchema), register);

// authRouter.post("/login", zValidator("json", loginSchema), login);

// authRouter.post("/logout", logout);

// authRouter.get("/me", getMe);

export default authRouter;