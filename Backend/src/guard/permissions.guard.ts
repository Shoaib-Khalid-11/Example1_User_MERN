// permissions.ts

export const PERMISSIONS = {
  USER_READ: "user:read",
  USER_CREATE: "user:create",
  USER_UPDATE: "user:update",
  USER_DELETE: "user:delete",

  ROLE_READ: "role:read",
  ROLE_CREATE: "role:create",
  ROLE_UPDATE: "role:update",
  ROLE_DELETE: "role:delete",

  PROFILE_UPDATE_OWN: "profile:update_own",
  PROFILE_UPDATE_ANY: "profile:update_any",
  PROFILE_DELETE_OWN: "profile:delete_own",
  // PROFILE_READ_ANY: "profile:read_any",

  SYSTEM_FULL_ACCESS: "system:full_access",
  SYSTEM_MANAGE: "system:manage",
} as const;
