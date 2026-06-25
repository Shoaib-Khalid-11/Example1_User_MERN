import { z } from "zod";

export const loginInSchema = z.object({
  // email: z
  //   .string()
  //   .trim()
  //   .email({
  //     message: "Invalid email address",
  //   })
  //   .max(100, "Email is too long"),

  // password: z
  //   .string()
  //   .min(8, "Password must be at least 8 characters")
  //   .max(128, "Password is too long")
  //   .regex(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  //     "Password must contain uppercase, lowercase, and number",
  //   ),
  email: z.string().email({
    message: "Invalid email address",
  }),

  password: z.string().min(6, "Min 6 characters"),
});

export type LoginInFormData = z.infer<typeof loginInSchema>;
