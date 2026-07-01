import { PERMISSIONS } from "./permissions.guard.ts";

export const ROLE_PERMISSIONS = {
  user: [PERMISSIONS.USER_READ],

  //   Moderator: [
  //     PERMISSIONS.USER_READ,
  //     PERMISSIONS.USER_UPDATE,
  //   ],

  admin: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,

    // PERMISSIONS.PRODUCT_CREATE,
    // PERMISSIONS.PRODUCT_UPDATE,
    // PERMISSIONS.PRODUCT_DELETE,
  ],

  //   SuperAdmin: Object.values(PERMISSIONS),
} as const;
