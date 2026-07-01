import type { HydratedDocument } from "mongoose";
import type {
  IPermissionsUser,
  IUser,
  IUserMethods,
  IRoleUser,
} from "../interfaces/index.ts";

export type IUserDocument = HydratedDocument<IUser, IUserMethods>;
export type IPermissionDocument = HydratedDocument<IPermissionsUser>;
export type IRoleDocument = HydratedDocument<IRoleUser>;
