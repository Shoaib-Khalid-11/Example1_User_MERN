import type { IPermissionsUser, IRoleUser, IUser } from "./models.interface.ts";

export interface IRolePopulated extends Omit<IRoleUser, "permissions"> {
  permissions: IPermissionsUser[];
}
export interface IUserPopulated extends Omit<IUser, "role"> {
  role: IRolePopulated;
}
