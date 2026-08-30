import { z } from "zod";

export const messageTargetParamSchema = z.object({
  type: z.enum(["channel", "direct"]),

  targetId: z.uuid({ version: "v4", message: "Invalid target id" }),
});

export const createMessageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Message cannot be empty")
    .max(4000, "Message cannot exceed 4000 characters"),
});

export type MessageTargetParam = z.infer<typeof messageTargetParamSchema>;

export type CreateMessageInput = z.infer<typeof createMessageSchema>;
