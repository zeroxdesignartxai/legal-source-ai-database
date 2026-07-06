import { z } from "zod";

export const jurisdictionSchema = z.enum(["CA", "Federal", "Local"]);

export const askRequestSchema = z.object({
  question: z.string().trim().min(8).max(1000),
  jurisdiction: jurisdictionSchema.default("CA"),
  topic: z.string().trim().max(80).optional()
});

export const uploadMetadataSchema = z.object({
  jurisdiction: jurisdictionSchema.default("CA")
});

export type AskRequest = z.infer<typeof askRequestSchema>;
