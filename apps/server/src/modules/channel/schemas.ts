import { z } from "zod";

export const workspaceIdParamSchema = z.object({
  workspaceId: z.string().uuid("Invalid workspace id"),
});

export const createChannelSchema = z.object({
  name: z
    .string()
    .min(2, "Channel name must be at least 2 characters")
    .max(100, "Channel name must not exceed 100 characters")
    .trim(),

  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),

  type: z.enum(["text", "voice"]).default("text"),

  isPrivate: z.boolean().default(false),
});

export type WorkspaceIdParam = z.infer<typeof workspaceIdParamSchema>;
export type CreateChannelInput = z.infer<typeof createChannelSchema>;