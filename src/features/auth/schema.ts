import { z } from "zod";

export const LoginFormObject = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password is required"),
});

export type LoginFormSchema = z.infer<typeof LoginFormObject>;
