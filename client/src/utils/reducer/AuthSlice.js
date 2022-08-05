import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient, { axiosPrivate } from "../axios";
// import { login, refreshToken } from "../action/AuthAction";
// import { login, refreshToken } from "./authAction";

// import { useLocalStorage } from "../../hook/useLocalstorage;
const modulePrefix = "auth";

export const login = createAsyncThunk(
  `${modulePrefix}/login`,
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosPrivate.post("/auth/login", data);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data));
      // console.log(res);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  `${modulePrefix}/refreshToken`,
  async ({ accessToken, refreshToken }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const res = await axiosPrivate.post("/auth/refresh-token", {
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
      const newAuth = {
        ...state.authData.auth,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      };
      return newAuth;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);
export const registerUser = createAsyncThunk(
  // action type string
  "auth/register",
  // callback function
  async (data, { rejectWithValue }) => {
    try {
      // make request to backend
      await axiosClient.post("/users", data);
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.response) {
        return rejectWithValue(error.response.data.response);
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);
const auth = JSON.parse(localStorage.getItem("user"));
const initialState = {
  auth: auth || null,
  loading: false,
  username: auth ? auth.username : null,
  isAdmin: auth ? auth.isAdmin : null,
  error: null,
  success: false,
};
const authSlice = createSlice({
  name: modulePrefix,
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken"); // deletes token from storage
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      state.loading = false;
      state.username = "";
      state.auth = null;
      state.isAdmin = null;
      state.error = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      //   console.log(action.payload);
      state.loading = false;
      state.auth = action.payload;
      state.username = action.payload.username;
      state.isAdmin = action.payload.isAdmin;
      state.success = true;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [refreshToken.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [refreshToken.fulfilled]: (state, { payload }) => {
      state.loading = false;
      localStorage.setItem("accessToken", JSON.stringify(payload.accessToken));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(payload.refreshToken)
      );
      state.auth = payload;
      state.username = payload.username;
      state.isAdmin = payload.isAdmin;
      state.success = true;
    },
    [refreshToken.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { logout, getLocal } = authSlice.actions;
export default authSlice.reducer;
