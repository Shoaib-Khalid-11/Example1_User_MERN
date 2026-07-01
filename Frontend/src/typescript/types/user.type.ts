// types/user.types.ts

import type { IUserApi } from "typescript/api/interface";

export type SortOrder = "asc" | "desc";

export const USER_ROLES = [
  "Developer",
  "Designer",
  "Manager",
  "Analyst",
  "Admin",
  "Support",
] as const;

export const USER_STATUSES = ["Active", "Inactive", "Pending"] as const;

export const USER_SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Java",
  "Go",
  "Rust",
  "Vue",
] as const;

export type UserRole = (typeof USER_ROLES)[number];
export type UserStatus = (typeof USER_STATUSES)[number];
export type UserSkill = (typeof USER_SKILLS)[number];

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: UserRole;
  status: UserStatus;
  joinDate: string; // YYYY-MM-DD
  avatar: string;
  skills: UserSkill[];
  rating: number;
  projects: number;
}

export type SortBy = "fullName" | "username" | "role" | "email";
export type FilterRole = "all" | "user" | "admin";
export type FilterStatus = "all" | "Active" | "Pending";
export interface UserState {
  users: IUserApi[] | null;
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
  filterRole: FilterRole;
  filterStatus: FilterStatus;
  sortBy: SortBy;
  sortOrder: SortOrder;
}
