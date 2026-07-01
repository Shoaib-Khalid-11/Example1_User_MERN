import type { PermissionTypes } from "../typescript/types/index.ts";
import { catchAsyncError } from "../utils/catchAsyncError.ts";
import { ErrorHandler } from "../utils/errorsHandler.ts";

export const hasPermission = (...required: PermissionTypes[]) =>
  catchAsyncError(async (req, res, next) => {
    // const { id } = req.body;
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler("Unauthorized", 401));
    }

    const permissions = user?.role?.permissions;

    const allowed = required.every((permission) =>
      permissions.includes(permission),
    );

    if (!allowed) {
      return next(new ErrorHandler("Forbidden", 403));
    }

    next();
  });
export const allowSelfOrPermission = (permission: PermissionTypes) =>
  catchAsyncError(async (req, res, next) => {
    const user = req.user;

    if (!user) {
      return next(new ErrorHandler("Unauthorized", 401));
    }

    if (user?._id.toString() === req.params.id) {
      return next();
    }

    if (user?.role?.permissions.includes(permission)) {
      return next();
    }

    return next(new ErrorHandler("Forbidden", 403));
  });
