/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "store";

export const selectUsersState = (state: RootState) => state.users;

export const selectFilteredUsers = createSelector(
  [selectUsersState],
  ({ users, searchTerm, filterRole, sortBy, sortOrder }) => {
    if (!users) return []; // Handle null case
    if (searchTerm === "") return users; // Handle empty search term
    let filtered = [...users!];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();

      filtered = filtered.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.username.toLowerCase().includes(searchLower) ||
          user.role.toLowerCase().includes(searchLower),
      );
    }

    if (filterRole !== "all") {
      filtered = filtered.filter((user) => user.role === filterRole);
    }

    // if (filterStatus !== "all") {
    //   filtered = filtered.filter((user) => user.status === filterStatus);
    // }

    filtered.sort((a, b) => {
      const aVal = (a as { [key: string]: any })[sortBy];
      const bVal = (b as { [key: string]: any })[sortBy];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (aVal < bVal) {
        return sortOrder === "asc" ? -1 : 1;
      }

      if (aVal > bVal) {
        return sortOrder === "asc" ? 1 : -1;
      }

      return 0;
    });

    return filtered;
  },
);
