import { UserEnum } from "typescript/api/enums";
import { z } from "zod";

export const userUpdateSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters",
    })
    .max(30, {
      message: "Username must not exceed 30 characters",
    }),

  fullName: z
    .string()
    .min(3, {
      message: "Full name must be at least 3 characters",
    })
    .max(100, {
      message: "Full name must not exceed 100 characters",
    }),

  email: z.email({
    message: "Invalid email address",
  }),

  role: z.nativeEnum(UserEnum, {
    message: "Invalid user role",
  }),

  isVerified: z.boolean(),
});

export type UserFormUpdateData = z.infer<typeof userUpdateSchema>;
