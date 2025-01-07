// src/redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === newItem.productId
      );
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      recalcTotals(state);
    },

    removeItem(state, action) {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      recalcTotals(state);
    },

    // NEW: updateItemQuantity
    updateItemQuantity(state, action) {
      const { productId, newQuantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);
      if (item && newQuantity > 0) {
        item.quantity = newQuantity;
      }
      recalcTotals(state);
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

function recalcTotals(state) {
  let totalQty = 0;
  let totalPrice = 0;
  state.items.forEach((item) => {
    totalQty += item.quantity;
    totalPrice += item.quantity * item.price;
  });
  state.totalQuantity = totalQty;
  state.totalPrice = totalPrice;
}

// Export the actions (including the new updateItemQuantity)
export const { addItem, removeItem, updateItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
