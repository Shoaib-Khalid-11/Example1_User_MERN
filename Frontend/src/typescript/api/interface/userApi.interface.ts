export interface IUserApi {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  isVerified: boolean;

  refreshToken: string | null;

  resetPasswordToken: string | null;
  resetPasswordExpire: string | null;

  verificationToken: string | null;
  verificationTokenExpire: string | null;

  createdAt: string;
  updatedAt: string;

  __v: number;
}
