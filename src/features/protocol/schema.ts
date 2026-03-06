import { z } from "zod";

export const ReviewFormObject = z.object({
  rating: z.coerce.number().min(1).max(5),
  feedback: z.string().nullable().optional(),
});

export type ReviewFormSchema = z.infer<typeof ReviewFormObject>;

export const CreateProtocolObject = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(255, "Title must be less than 255 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  tags: z.string().optional(),
});

export type CreateProtocolSchema = z.infer<typeof CreateProtocolObject>;
