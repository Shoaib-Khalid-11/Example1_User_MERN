import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector, type RootState } from "store";
import { PaletteModeEnum } from "typescript/enums";
import type { AppStateProps } from "typescript/types";

const initialState: AppStateProps = {
  mode: PaletteModeEnum.Light,
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setThemeMode: (
      state: AppStateProps,
      action: PayloadAction<PaletteModeEnum>,
    ) => {
      state.mode = action.payload;
      document.documentElement.setAttribute("data-theme", action.payload);
    },
  },
});

export const { setThemeMode } = appSlice.actions;
export const appSelector = (appSiteState: RootState): AppStateProps =>
  appSiteState.app;

export const useAppStore = () => {
  const dispatch = useAppDispatch();
  return {
    appState: useAppSelector(appSelector),
    setThemeMode: (theme: PaletteModeEnum) => dispatch(setThemeMode(theme)),
  };
};
