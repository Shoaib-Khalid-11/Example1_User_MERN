import type {
  IPermissionsUser,
  IRolePopulated,
  IUserPopulated,
} from "../interfaces/index.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IUserPopulated;
      permission?: IPermissionsUser[];
      role?: IRolePopulated;
    }
  }
}
