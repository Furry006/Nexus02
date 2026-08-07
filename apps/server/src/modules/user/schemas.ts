import { z } from "zod";

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Current password must be at least 8 characters",
  }),
  newPassword: z.string().min(8, {
    message: "New password must be at least 8 characters",
  }),
});

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  avatar: z.string().nullable(),
  isVerified: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters",
    })
    .optional(),

  fullName: z
    .string()
    .min(2, {
      message: "Full name must be at least 2 characters",
    })
    .optional(),
});
