import { z } from "@hono/zod-openapi";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, {
      message: "Workspace name must be more than 3 characters",
    })
    .max(255, {
      message: "Workspace name must not exceed 255 characters",
    }),
  description: z
    .string()
    .trim()
    .max(255, {
      message: "Description must not exceed 255 characters",
    })
    .optional(),
});

export const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, {
      message: "Workspace name must be at least 3 characters",
    })
    .max(255, {
      message: "Workspace name must not exceed 255 characters",
    })
    .optional(),
  description: z
    .string()
    .trim()
    .max(1000, {
      message: "Description must not exceed 1000 characters",
    })
    .optional(),
});

export const joinWorkspaceSchema = z.object({
  inviteCode: z
    .string()
    .trim()
    .length(10, {
      message: "Invalid invite code",
    }),
});
