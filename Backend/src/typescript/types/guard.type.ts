import type { PERMISSIONS } from "../../guard/index.ts";

export type PermissionTypes = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
