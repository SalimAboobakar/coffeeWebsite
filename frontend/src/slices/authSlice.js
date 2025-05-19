// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const authUser = createAsyncThunk(
  "auth/authUser",
  async ({ mode, data }, thunkAPI) => {
    const res = await api.post(`/auth/${mode}`, data);
    return res.data; // { user, token }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, status: "idle", error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(authUser.rejected, (state, { error }) => {
        state.status = "failed";
        state.error = error.message;
      });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
