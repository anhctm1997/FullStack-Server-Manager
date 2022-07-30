import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../axios";
// import { deleteUser, addUser, fetchUsersList } from "../action/UserAction";

export const fetchUsersList = createAsyncThunk(
  "users/fetchUsersList",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get("/users", { params: params });
      return data;
    } catch (error) {
      //   console.log(error);
      if (error.message) {
        // console.log(`${error.response} : ${error.message}`);
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const getUser = createAsyncThunk(
  "users/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get(`/users/${id}`);
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (body, { getState, rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post("/users", body);

      return data;
    } catch (error) {
      // return custom error message from API if any
      // console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const res = await axiosClient.put(`/users/${id}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "userProfile/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/users/${id}`);
      return id;
    } catch (error) {
      // return custom error message from API if any
      // console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
const initialState = {
  loading: false,
  userInfo: { username: "", password: "", isAdmin: 2, email: null },
  userList: [],
  meta: { totalCount: null, totalPage: null },
  error: null,
  success: false,
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsersList.pending](state) {
      state.loading = true;
      state.error = false;
      state.success = false;
    },
    [fetchUsersList.fulfilled](state, { payload }) {
      state.userList = payload.data;
      state.meta = payload.meta;
      state.loading = false;
      state.success = true;
    },
    [fetchUsersList.rejected](state, { payload }) {
      state.error = payload;
      state.loading = false;
      state.success = true;
    },
    [addUser.pending](state) {
      state.loading = true;
      state.error = null;
    },
    [addUser.fulfilled](state, { payload }) {
      state.userInfo = payload;
      state.userList.push(payload);
      state.loading = false;
    },
    [addUser.rejected](state, { payload }) {
      state.error = payload;
      state.loading = false;
    },
    [getUser.pending](state) {
      state.loading = true;
      state.error = null;
    },
    [getUser.fulfilled](state, { payload }) {
      state.userInfo = payload;
      state.loading = false;
      state.success = true;
    },
    [getUser.rejected](state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
    [deleteUser.pending](state) {
      state.loading = true;
      state.error = null;
    },
    [deleteUser.fulfilled](state, { payload }) {
      const newList = state.userList.filter((user) => user._id !== payload);
      state.userList = newList;
      state.meta.totalCount -= 1;
      state.loading = false;
    },
    [deleteUser.rejected](state, { payload }) {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
