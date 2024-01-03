import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import tabReducer from "./features/user/tabSlice";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    tabState: tabReducer,
  },
});
