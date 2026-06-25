export interface IUserApi {
  username: string;
  email: string;
  fullName: string;
  password?: string;
  role: "user" | "admin";
  isVerified: boolean;
  refreshToken: string | null; // ← Optional (? mark)
  resetPasswordToken: string | null;
  resetPasswordExpire: Date | null;
  // resetPasswordTokenExpire?: Date;
  verificationToken: string | null;
  verificationTokenExpire: Date | null;
}
