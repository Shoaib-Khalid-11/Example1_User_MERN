import type mongoose from "mongoose";
import type { PermissionTypes } from "../types/index.ts";
import type { RoleEnum } from "../enums/index.ts";

export interface IUser {
  _id: mongoose.Types.ObjectId; // ← Optional (? mark)
  username: string;
  email: string;
  fullName: string;
  password: string;
  role: mongoose.Types.ObjectId | IRoleUser;
  isVerified: boolean;
  refreshToken: string | null; // ← Optional (? mark)
  resetPasswordToken: string | null;
  resetPasswordExpire: Date | null;
  // resetPasswordTokenExpire?: Date;
  verificationToken: string | null;
  verificationTokenExpire: Date | null;
}
export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateVarificationToken(): string;
  generateRefreshToken(): string;
  getResetPasswordToken(): string;
}

export interface IRoleUser {
  _id: mongoose.Types.ObjectId;
  name: RoleEnum;
  permissions: mongoose.Types.ObjectId[];
}
export interface IPermissionsUser {
  _id: mongoose.Types.ObjectId;
  name: PermissionTypes;
}
