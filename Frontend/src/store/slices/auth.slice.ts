import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector, type RootState } from "store";
import type { AuthStoreType } from "typescript/types";

const initialState: AuthStoreType = {
  isAuthenticated: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuntaticated: (
      state: AuthStoreType,
      action: PayloadAction<boolean>,
    ) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setIsAuntaticated } = authSlice.actions;
export const authSelector = (appSiteState: RootState): AuthStoreType =>
  appSiteState.auth;

export const useAuthStore = () => {
  const dispatch = useAppDispatch();
  return {
    authState: useAppSelector(authSelector),
    setIsAuntaticated: (isAuthed: boolean) =>
      dispatch(setIsAuntaticated(isAuthed)),
  };
};
