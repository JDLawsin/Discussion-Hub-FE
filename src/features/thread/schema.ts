import { z } from "zod";

export const CreateThreadObject = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(255, "Title must be less than 255 characters"),
  body: z.string().min(10, "Content must be at least 10 characters"),
  tags: z.string().optional(),
});

export type CreateThreadSchema = z.infer<typeof CreateThreadObject>;
