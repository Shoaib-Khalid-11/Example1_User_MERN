import {
  USER_ROLES,
  USER_SKILLS,
  USER_STATUSES,
  type User,
} from "typescript/types/user.type";
import { randomItem } from "./randomItem";

export const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(
    Math.floor(Math.random() * 9000) + 1000,
  )}`,
  location: randomItem([
    "New York",
    "London",
    "Tokyo",
    "Paris",
    "Sydney",
    "Berlin",
    "Singapore",
    "Dubai",
  ]),
  role: randomItem(USER_ROLES),
  status: randomItem(USER_STATUSES),
  joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  avatar: `https://ui-avatars.com/api/?name=User+${
    i + 1
  }&background=random&color=fff`,
  skills: USER_SKILLS.slice(
    0,
    Math.floor(Math.random() * 4) + 1,
  ) as User["skills"],
  rating: Math.round((Math.random() * 4 + 1) * 10) / 10,
  projects: Math.floor(Math.random() * 20) + 1,
}));
