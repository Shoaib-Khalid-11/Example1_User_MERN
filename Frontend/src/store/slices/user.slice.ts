// store/slices/userSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { mockUsers } from "data/mokeData";
import { useAppDispatch, useAppSelector, type RootState } from "store";
import {
  selectFilteredUsers,
  selectPaginatedUsers,
  selectTotalPages,
} from "store/selectors";
import type { SortOrder, User, UserState } from "typescript/types/user.type";

const initialState: UserState = {
  users: mockUsers,
  searchTerm: "",
  currentPage: 1,
  itemsPerPage: 9,
  filterRole: "all",
  filterStatus: "all",
  sortBy: "name",
  sortOrder: "asc",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },

    setFilterRole: (state, action: PayloadAction<string>) => {
      state.filterRole = action.payload;
      state.currentPage = 1;
    },

    setFilterStatus: (state, action: PayloadAction<string>) => {
      state.filterStatus = action.payload;
      state.currentPage = 1;
    },

    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },

    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
      state.currentPage = 1;
    },

    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      state.currentPage = 1;
    },

    resetFilters: (state) => {
      state.searchTerm = "";
      state.filterRole = "all";
      state.filterStatus = "all";
      state.sortBy = "name";
      state.sortOrder = "asc";
      state.currentPage = 1;
    },
  },
});

export const {
  setUsers,
  setSearchTerm,
  setCurrentPage,
  setItemsPerPage,
  setFilterRole,
  setFilterStatus,
  setSortBy,
  setSortOrder,
  toggleSortOrder,
  resetFilters,
} = userSlice.actions;

export const userSelector = (appSiteState: RootState): UserState =>
  appSiteState.users;
export const useUserSliceStore = () => {
  const dispatch = useAppDispatch();
  return {
    filteredUsers: useAppSelector(selectFilteredUsers),
    paginatedUsers: useAppSelector(selectPaginatedUsers),
    totalPages: useAppSelector(selectTotalPages),
    userState: useAppSelector(userSelector),
    setUsers: (users: User[]) => dispatch(setUsers(users)),
    setSearchTerm: (term: string) => dispatch(setSearchTerm(term)),
    setCurrentPage: (page: number) => dispatch(setCurrentPage(page)),
    setItemsPerPage: (items: number) => dispatch(setItemsPerPage(items)),
    setFilterRole: (role: string) => dispatch(setFilterRole(role)),
    setFilterStatus: (status: string) => dispatch(setFilterStatus(status)),
    setSortBy: (by: string) => dispatch(setSortBy(by)),
    setSortOrder: (order: SortOrder) => dispatch(setSortOrder(order)),
    toggleSortOrder: () => dispatch(toggleSortOrder()),
    resetFilters: () => dispatch(resetFilters()),
  };
};
// export default userSlice.reducer;
