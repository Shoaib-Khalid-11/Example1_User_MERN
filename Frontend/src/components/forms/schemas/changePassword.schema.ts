import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, {
      message: "Old password must be at least 6 characters",
    }),

    newPassword: z.string().min(6, {
      message: "New password must be at least 6 characters",
    }),

    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters",
    }),
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: "New password must be different from the old password",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
