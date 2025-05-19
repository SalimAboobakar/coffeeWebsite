import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  console.log("⚡️ running thunk: fetchProducts");
  const res = await api.get("/products");
  console.log("⚡️ thunk got data:", res.data);
  return res.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: { list: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        console.log("⏳ fetchProducts.pending");
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log("✅ fetchProducts.fulfilled");
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log("❌ fetchProducts.rejected", action.error.message);
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
