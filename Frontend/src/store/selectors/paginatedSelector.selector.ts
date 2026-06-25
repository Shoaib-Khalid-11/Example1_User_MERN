import { createSelector } from "@reduxjs/toolkit";
import { selectFilteredUsers, selectUsersState } from "./userSelector.selector";

export const selectPaginatedUsers = createSelector(
  [selectFilteredUsers, selectUsersState],
  (filteredUsers, { currentPage, itemsPerPage }) => {
    const start = (currentPage - 1) * itemsPerPage;

    return filteredUsers.slice(start, start + itemsPerPage);
  },
);
export const selectTotalPages = createSelector(
  [selectFilteredUsers, selectUsersState],
  (filteredUsers, { itemsPerPage }) =>
    Math.ceil(filteredUsers.length / itemsPerPage),
);
