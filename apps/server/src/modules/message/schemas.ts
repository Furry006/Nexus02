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

export const getMessagesQuerySchema = z.object({
    limit: z.coerce.number().int().min(1).max(100).default(50),
    beforeCreatedAt: z.iso.datetime().optional(),
    beforeId: z.uuid({ version: "v4", message: "Invalid message id" })
      .optional(),
  })
  .refine(
    (data) =>
      (!data.beforeCreatedAt && !data.beforeId) ||
      (data.beforeCreatedAt && data.beforeId),
    {
      message: "beforeCreatedAt and beforeId must be provided together",
    },
  );

export type MessageTargetParam = z.infer<typeof messageTargetParamSchema>;
export type CreateMessageInput = z.infer<typeof createMessageSchema>;
export type GetMessagesQuery = z.infer<typeof getMessagesQuerySchema>;
