import type { Response, NextFunction, Request } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { catchAsyncError } from "../utils/catchAsyncError.ts";
import { ErrorHandler } from "../utils/errorsHandler.ts";
import { User } from "../models/index.ts";

interface AuthTokenPayload extends JwtPayload {
  id: string;
}

export const isProtected = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(new ErrorHandler("Please authenticate", 401));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(new ErrorHandler("Token not found", 401));
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY!,
      ) as AuthTokenPayload;

      if (!decoded.id) {
        return next(new ErrorHandler("Invalid token payload", 401));
      }

      const user = await User.findById(decoded.id)
        .select("-password")
        .populate({ path: "role", populate: { path: "permissions" } });

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      req.user = user;

      next();
    } catch {
      return next(new ErrorHandler("Invalid or expired token", 401));
    }
  },
);
