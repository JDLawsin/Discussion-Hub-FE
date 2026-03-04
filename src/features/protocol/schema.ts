import { z } from "zod";

export const ReviewFormObject = z.object({
  rating: z.coerce.number().min(1).max(5),
  feedback: z.string().nullable().optional(),
});

export type ReviewFormSchema = z.infer<typeof ReviewFormObject>;
