import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import { getExpiryTime } from "../utils/cookie.ts";
import type { HydratedDocument } from "mongoose";

interface IUser {
  username: string;
  email: string;
  fullName: string;
  password: string;
  role: "user" | "admin";
  isVerified: boolean;
  refreshToken: string | null; // ← Optional (? mark)
  resetPasswordToken: string | null;
  resetPasswordExpire: Date | null;
  // resetPasswordTokenExpire?: Date;
  verificationToken: string | null;
  verificationTokenExpire: Date | null;
}

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateVarificationToken(): string;
  generateRefreshToken(): string;
  getResetPasswordToken(): string;
}
type UserModel = Model<IUser, {}, IUserMethods>;

export type IUserDocument = HydratedDocument<IUser, IUserMethods>;

const JWT_EXPIRES_Varification_Token: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_VARIFICATION_TOKEN as SignOptions["expiresIn"]) ||
  "24h";
const JWT_EXPIRES_Refresh_Token: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_REFRESH_TOKEN as SignOptions["expiresIn"]) || "30d";

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      //   trim: true,
      minlength: [3, "Full name must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "This Email is already exists"],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpire: {
      type: Date,
      default: null, // ← Optional (? mark)
    },
    // resetPasswordTokenExpire: {
    //   type: Date,
    // },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationTokenExpire: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (this: IUserDocument) {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (
  this: IUserDocument,
  candidatePassword: string,
): Promise<boolean> {
  if (!this.password) return false;

  return bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.generateVarificationToken = function (
  this: IUserDocument,
): string {
  const JWT_SECRET: Secret = process.env.JWT_SECRET_KEY as string;

  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_Varification_Token,
  };

  return jwt.sign({ email: this.email.toString() }, JWT_SECRET, options);
};
userSchema.methods.generateRefreshToken = function (
  this: IUserDocument,
): string {
  const JWT_SECRET: Secret = process.env.JWT_SECRET_KEY as string;

  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_Refresh_Token,
  };

  return jwt.sign({ id: this._id.toString() }, JWT_SECRET, options);
};
userSchema.methods.getResetPasswordToken = function (
  this: IUserDocument,
): string {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = new Date(
    Date.now() + getExpiryTime({ value: 1, unit: "days" }),
  );
  return resetToken;
};
export const User = mongoose.model<IUser, UserModel>("User", userSchema);
