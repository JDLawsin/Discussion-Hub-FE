import { z } from "zod";

export const CommentFormObject = z.object({
  comment: z.string().min(1, "Comment is required"),
});

export type CommentFormSchema = z.infer<typeof CommentFormObject>;
