import { configureStore, createSlice } from "@reduxjs/toolkit";

type initialStateBody = {
  isUserAuthenticated: boolean;
};

const initialAppState: initialStateBody = {
  isUserAuthenticated: false,
};

const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {},
});

const store = configureStore({
  reducer: appSlice.reducer,
});

export const {} = appSlice.actions;

export default store;

export type RootState = ReturnType<typeof store.getState>;
