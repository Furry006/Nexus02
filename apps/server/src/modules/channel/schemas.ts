import { z } from "zod";

export const createChannelSchema = z.object({
    name: z
        .string()
        .min(1, "Channel name is required")
        .max(100, "Channel name must not exceed 100 character")
        .trim(),
    description: z
        .string()
        .max(500, "Description must not exceed 500 character")
        .optional(),
    type: z
        .enum(["text", "voice"])
        .default("text"),
    isPrivate: z
        .boolean()
        .default(false),
});



