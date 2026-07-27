import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  fullName: z.string().min(3, "Full name is required"),
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.email({
    message: "Invalid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Current password must be at least 8 characters",
  }),
  newPassword: z.string().min(8, {
    message: "New password must be at least 8 characters",
  }),
});
