import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "store";
import type { IUserApi } from "typescript/api/interface";
import type {
  FilterRole,
  FilterStatus,
  SortBy,
  SortOrder,
  UserState,
} from "typescript/types/user.type";

const initialState: UserState = {
  users: null,
  searchTerm: "",
  currentPage: 1,
  itemsPerPage: 9,
  filterRole: "all",
  filterStatus: "all",
  sortBy: "fullName",
  sortOrder: "asc",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUserApi[]>) => {
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

    setFilterRole: (state, action: PayloadAction<FilterRole>) => {
      state.filterRole = action.payload;
      state.currentPage = 1;
    },

    setFilterStatus: (state, action: PayloadAction<FilterStatus>) => {
      state.filterStatus = action.payload;
      state.currentPage = 1;
    },

    setSortBy: (state, action: PayloadAction<SortBy>) => {
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
      state.sortBy = "fullName";
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
