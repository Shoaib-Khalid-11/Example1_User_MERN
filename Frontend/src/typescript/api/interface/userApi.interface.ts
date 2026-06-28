import type { UserEnum } from "../enums";

export interface IUserApi {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  role: UserEnum;
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
export interface IUserUpdateApi {
  username: string;
  fullName: string;
  email: string;
  role: UserEnum;
  isVerified: boolean;
}
