import { z } from "zod";

export const registrationSchema = z
  .object({
    fullName: z.string().min(3, {
      message: "Full name must be at least 3 characters",
    }),
    username: z.string().min(3, {
      message: "Username must be at least 3 characters",
    }),
    email: z.email({
      message: "Invalid email address",
    }),
    password: z.string().min(6, {
      message: "Min 6 characters",
    }),
    confirmPassword: z.string().min(6, {
      message: "Min 6 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
