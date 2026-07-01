import { PERMISSIONS } from "../guard/index.ts";
import { Permission, Role } from "../models/index.ts";
import { RoleEnum } from "../typescript/enums/models.enum.ts";
import type { PermissionTypes } from "../typescript/types/guard.type.ts";

export const rolePermissionSeeder = async () => {
  const permissions = await Permission.insertMany([
    { name: PERMISSIONS.USER_READ },
    { name: PERMISSIONS.USER_CREATE },
    { name: PERMISSIONS.USER_UPDATE },
    { name: PERMISSIONS.USER_DELETE },
    { name: PERMISSIONS.ROLE_READ },
    { name: PERMISSIONS.ROLE_CREATE },
    { name: PERMISSIONS.ROLE_UPDATE },
    { name: PERMISSIONS.ROLE_DELETE },
    { name: PERMISSIONS.PROFILE_UPDATE_OWN },
    { name: PERMISSIONS.PROFILE_UPDATE_ANY },
    { name: PERMISSIONS.PROFILE_DELETE_OWN },
    { name: PERMISSIONS.SYSTEM_FULL_ACCESS },
    { name: PERMISSIONS.SYSTEM_MANAGE },
  ]);
  const getPermId = (permission: PermissionTypes) =>
    permissions.find((p) => p.name === permission)!._id;
  const adminRole = await Role.create({
    name: RoleEnum.Admin,
    permissions: [
      getPermId(PERMISSIONS.SYSTEM_MANAGE),
      getPermId(PERMISSIONS.SYSTEM_FULL_ACCESS),
      getPermId(PERMISSIONS.ROLE_READ),
      getPermId(PERMISSIONS.ROLE_CREATE),
      getPermId(PERMISSIONS.ROLE_UPDATE),
      getPermId(PERMISSIONS.ROLE_DELETE),
      getPermId(PERMISSIONS.USER_READ),
      getPermId(PERMISSIONS.USER_CREATE),
      getPermId(PERMISSIONS.USER_UPDATE),
      getPermId(PERMISSIONS.USER_DELETE),
      getPermId(PERMISSIONS.PROFILE_UPDATE_OWN),
      getPermId(PERMISSIONS.PROFILE_UPDATE_ANY),
      getPermId(PERMISSIONS.PROFILE_DELETE_OWN),
    ],
  });
  const userRole = await Role.create({
    name: RoleEnum.User,
    permissions: [
      getPermId(PERMISSIONS.USER_READ),
      getPermId(PERMISSIONS.USER_CREATE),
      getPermId(PERMISSIONS.USER_UPDATE),
      getPermId(PERMISSIONS.USER_DELETE),
      getPermId(PERMISSIONS.PROFILE_UPDATE_OWN),
      getPermId(PERMISSIONS.PROFILE_DELETE_OWN),
    ],
  });
  return { adminRole, userRole };
};
export default rolePermissionSeeder;
