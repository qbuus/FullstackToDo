import { configureStore, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/User";
import { ToDoBody } from "../models/ToDo";

type initialStateBody = {
  isUserAuthenticated: true | false;
  AuthenticatedUser: User | null;
  ToDoList: ToDoBody[];
  EditSingleToDo: ToDoBody | null;
};

const initialAppState: initialStateBody = {
  isUserAuthenticated: false,
  AuthenticatedUser: null,
  ToDoList: [],
  EditSingleToDo: null,
};

const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    isAuth(state, action) {
      state.isUserAuthenticated = action.payload;
    },
    authUser(state, action) {
      state.AuthenticatedUser = action.payload;
    },
    ToDos(state, action) {
      state.ToDoList = action.payload;
    },
    EditToDo(state, action) {
      state.EditSingleToDo = action.payload;
    },
  },
});

const store = configureStore({
  reducer: appSlice.reducer,
});

export const { isAuth, authUser, ToDos, EditToDo } =
  appSlice.actions;

export default store;

export type RootState = ReturnType<typeof store.getState>;
