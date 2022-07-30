import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../axios";
// import { deleteUser, addUser, fetchUsersList } from "../action/UserAction";

export const fetchServersList = createAsyncThunk(
  "servers/fetchServersList",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get("/servers", { params: params });
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

export const getServer = createAsyncThunk(
  "servers/getServer",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get(`/servers/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

export const addServer = createAsyncThunk(
  "servers/addServer",
  async (body, { getState, rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post("/servers", body);

      return data;
    } catch (error) {
      // return custom error message from API if any
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateServer = createAsyncThunk(
  "servers/updateServer",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const res = await axiosClient.put(`/servers/${id}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.response);
    }
  }
);

export const deleteServer = createAsyncThunk(
  "servers/deleteServer",
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/servers/${id}`);
      return id;
    } catch (error) {
      // return custom error message from API if any
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
const initialState = {
  loading: false,
  serverInfo: {},
  serverList: [],
  meta: { totalCount: null, totalPage: null },
  error: null,
  success: false,
};
const serverSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchServersList.pending](state) {
      state.loading = true;
      state.error = false;
      state.success = false;
    },
    [fetchServersList.fulfilled](state, { payload }) {
      state.loading = false;
      state.serverList = payload.data;
      state.meta = payload.meta;
      state.success = true;
    },
    [fetchServersList.rejected](state, { payload }) {
      state.loading = false;
      state.error = payload;
      state.success = true;
    },
    [addServer.pending](state) {
      state.loading = true;
      state.error = null;
    },
    [addServer.fulfilled](state, { payload }) {
      state.loading = false;
      state.serverInfo = payload;
      state.userList.push(payload);
    },
    [addServer.rejected](state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
    [getServer.pending](state) {
      state.loading = true;
      state.error = null;
    },
    [getServer.fulfilled](state, { payload }) {
      state.loading = false;
      state.userInfo = payload;
      state.success = true;
    },
    [getServer.rejected](state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
    [deleteServer.pending](state) {
      state.loading = true;
      state.error = null;
    },
    [deleteServer.fulfilled](state, { payload }) {
      state.loading = false;
      const newList = state.serverList.filter(
        (server) => server._id !== payload
      );
      state.serverList = newList;
      state.meta.totalCount -= 1;
    },
    [deleteServer.rejected](state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default serverSlice.reducer;
