import { configureStore, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/User";

type initialStateBody = {
  isUserAuthenticated: boolean;
  AuthenticatedUser: User | null;
};

const initialAppState: initialStateBody = {
  isUserAuthenticated: false,
  AuthenticatedUser: null,
};

const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    isAuth(state) {
      state.isUserAuthenticated = !state.isUserAuthenticated;
    },
    authUser(state, action) {
      state.AuthenticatedUser = action.payload;
    },
  },
});

const store = configureStore({
  reducer: appSlice.reducer,
});

export const { isAuth, authUser } = appSlice.actions;

export default store;

export type RootState = ReturnType<typeof store.getState>;
