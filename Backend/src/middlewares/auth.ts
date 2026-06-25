import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { catchAsyncError } from "../utils/catchAsyncError.ts";
import { ErrorHandler } from "../utils/errorsHandler.ts";
import { User, type IUserDocument } from "../models/userSchema.model.ts";

interface AuthTokenPayload extends JwtPayload {
  id: string;
}
interface ExtendedRequest extends Request {
  user?: IUserDocument;
}

export const isAuthenticated = catchAsyncError(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
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

      const user = await User.findById(decoded.id).select("-password");

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
