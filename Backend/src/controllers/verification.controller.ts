import type { JwtPayload } from "jsonwebtoken";
import { User } from "../models/userSchema.model.ts";
import { catchAsyncError } from "../utils/catchAsyncError.ts";
import { verifyVerificationTokens } from "../utils/verifyVerificationTokens.ts";
import { ErrorHandler } from "../utils/errorsHandler.ts";
import crypto from "crypto";

export const verifyEmail = catchAsyncError(async (req, res, next) => {
  try {
    const { token } = req.params;
    const decoded = await verifyVerificationTokens(token);
    const user = await User.findOne({
      email: (decoded as JwtPayload).email as string,
      verificationToken: token as string,
      verificationTokenExpire: { $gt: new Date() },
    });
    if (!user) {
      return next(new ErrorHandler("Invalid token or token expired", 400));
    }
    if (user.isVerified) {
      return next(new ErrorHandler("User is already verified", 400));
    }
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpire = null;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User verified successfully" });
  } catch (error) {
    next(new ErrorHandler("Invalid token or token expired", 400));
  }
});
export const ResetPasswordEmail = catchAsyncError(async (req, res, next) => {
  // try {
  const { resetPasswordTokenParam } = req.params;
  const { password, confirmPassword } = req.body;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetPasswordTokenParam as string)
    .digest("hex");

  if (!password || !confirmPassword) {
    return next(new ErrorHandler("Password fields are required", 400));
  }

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password & Confirm Password do not match", 400),
    );
  }
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: new Date() },
  });
  if (!user) {
    return next(new ErrorHandler("Invalid or expired reset token", 400));
  }
  user.password = password;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  await user.save();
  // } catch (error) {
  //   next(new ErrorHandler("Invalid token or token expired", 400));
  // }
});
