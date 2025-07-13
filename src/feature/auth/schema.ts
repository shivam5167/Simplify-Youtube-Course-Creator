import { z } from "zod";

export const signInSchema = z
  .object({
    firstName: z.string().min(2).max(255),
    lastName: z.string().max(255).optional(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, {
        message: "Password must contain at least 8 characters",
      })
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain a special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignInType = z.infer<typeof signInSchema>;
