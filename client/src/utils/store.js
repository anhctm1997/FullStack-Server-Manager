import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducer/UserSlice";
import authReducer from "./reducer/AuthSlice";
import serverReducer from "./reducer/ServerSlice";
export const store = configureStore({
  reducer: {
    userData: usersReducer,
    authData: authReducer,
    serverData: serverReducer,
  },
});
