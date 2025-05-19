// src/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // each: { _id, name, price, imageUrl, quantity }
  },
  reducers: {
    addToCart: (state, action) => {
      const added = action.payload; // full product + quantity
      const existing = state.items.find((i) => i._id === added._id);
      if (existing) {
        existing.quantity += added.quantity;
      } else {
        state.items.push(added);
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i._id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
