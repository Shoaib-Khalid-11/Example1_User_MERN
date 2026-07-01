import { User } from "../models/userSchema.model.ts";
import { catchAsyncError } from "../utils/catchAsyncError.ts";
import { generateCookieOptions, getExpiryTime } from "../utils/cookie.ts";
import { sendCookie } from "../utils/cookieHandler.ts";
import { sendEmail } from "../utils/sendEmail.ts";
import { ErrorHandler } from "../utils/errorsHandler.ts";
import {
  email_Structure_Function,
  resetPasswordEmail_Structure_Function,
  // welcomeEmail_Structure_Function,
} from "../contents/emails.ts";
import { verifyVerificationTokens } from "../utils/verifyVerificationTokens.ts";
import type { JwtPayload } from "jsonwebtoken";

export const register = catchAsyncError(async (req, res, next) => {
  const { username, email, password, fullName, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password & Confirm Password do not match", 400),
    );
  }
  const user = await User.create({ username, email, password, fullName });
  const varificationToken = user.generateVarificationToken();

  user.verificationToken = varificationToken;
  user.verificationTokenExpire = new Date(
    Date.now() + getExpiryTime({ value: 1, unit: "days" }),
  );

  await user.save();

  const varificationTokenUrl = `${process.env.APP_URL}/varify-email/${varificationToken}`;
  try {
    await sendEmail({
      emailFrom: "shoaibkhalid330@gmail.com", // replace with your email
      emailTo: email,
      subject: "Verify your email",
      html: email_Structure_Function(
        "Verify your email",
        varificationTokenUrl,
        "Click to verify",
      ),
    });
    res.status(201).json({
      success: true,
      message:
        "Registration successful! Please check your email to verify your account.",
      user,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Provided credentials are incorrect", 401));
  }
  const matched = await user.comparePassword(password);
  if (!matched) {
    return next(new ErrorHandler("Provided Password is not correct", 401));
  }
  if (!user.isVerified) {
    return next(new ErrorHandler("User is not verified", 401));
  }
  if (matched) {
    user.refreshToken = user.generateRefreshToken();
    await user.save({ validateBeforeSave: false });
    // sendEmail({
    //   emailFrom: "shoaibkhalid330@gmail.com", // replace with your email
    //   emailTo: email,
    //   subject: "Login successful",
    //   html: welcomeEmail_Structure_Function(
    //     user.fullName,
    //     "User Application",
    //     "",
    //     new Date().getFullYear().toString(),
    //   ),
    // });
    const { password, ...safeUser } = user.toObject();
    sendCookie({
      res,
      name: "Token",
      token: user.refreshToken,
      user: safeUser,
      message: "User logged in successfully",
      statusCode: 200,
      cookieOptions: generateCookieOptions({
        expiresIn: { value: 7, unit: "days" },
        httpOnly: true,
        sameSite: "strict",
      }),
    });
  }
});
export const logout = catchAsyncError(async (req, res, next) => {
  const Token = req.cookies.Token;

  if (!Token) {
    return next(new ErrorHandler("No Token found", 401));
  }
  const decoded = await verifyVerificationTokens(Token);
  const user = await User.findOne(
    { _id: (decoded as JwtPayload).id },
    { validateBeforeSave: false },
  );
  if (!user) {
    return next(new ErrorHandler("No user found", 401));
  }
  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });
  res.clearCookie("Token");
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});
export const getUserProfile = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("No user found", 401));
  }
  res.status(200).json({
    success: true,
    user,
  });
});
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});
export const updateUserProfile = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { username, email, fullName, role, isVerified } = req.body;
  const user = await User.updateOne(
    { _id: id },
    { $set: { username, email, fullName, role, isVerified } },
  );
  if (!user) {
    return next(new ErrorHandler("No user found", 401));
  }
  res.status(200).json({
    success: true,
    message: "User profile updated successfully",
    user,
  });
});
export const deleteUserProfile = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.deleteOne({ _id: id });
  if (!user) {
    return next(new ErrorHandler("No user found", 401));
  }
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("No user found", 401));
  }
  const resetToken = user.getResetPasswordToken();
  // user.resetPasswordToken = resetToken;
  // user.resetPasswordExpire = new Date(
  //   Date.now() + getExpiryTime({ value: 1, unit: "days" }),
  // );
  await user.save({ validateBeforeSave: false });
  const resetTokenUrl = `${process.env.APP_URL}/api/v1/verifications/reset/password/${resetToken}`;
  try {
    await sendEmail({
      emailFrom: "shoaibkhalid330@gmail.com", // replace with your email
      emailTo: email,
      subject: "Reset your password",
      html: resetPasswordEmail_Structure_Function(
        user.fullName,
        "User Application",
        resetTokenUrl,
        user.resetPasswordExpire!.toISOString(),
        new Date().getFullYear().toString(),
      ),
    });
    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const updatePassword = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(id).select("+password");
  if (!user) {
    return next(new ErrorHandler("No user found", 401));
  }
  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  if (newPassword !== confirmPassword) {
    return next(
      new ErrorHandler("Password & Confirm Password do not match", 400),
    );
  }
  const isPasswordMatched = await user.comparePassword(oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});
