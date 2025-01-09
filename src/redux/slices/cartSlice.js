// src/redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

/** Load cart from localStorage */
function loadCartFromLocalStorage() {
  try {
    const cartData = localStorage.getItem("cart");
    if (!cartData) {
      return {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      };
    }
    return JSON.parse(cartData);
  } catch {
    return {
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
    };
  }
}

/** Save cart to localStorage */
function saveCartToLocalStorage(state) {
  const cartToStore = {
    items: state.items,
    totalQuantity: state.totalQuantity,
    totalPrice: state.totalPrice,
  };
  localStorage.setItem("cart", JSON.stringify(cartToStore));
}

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

// Initial state from local storage
const initialState = loadCartFromLocalStorage();

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
      saveCartToLocalStorage(state);
    },

    removeItem(state, action) {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      recalcTotals(state);
      saveCartToLocalStorage(state);
    },

    updateItemQuantity(state, action) {
      const { productId, newQuantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);
      if (item && newQuantity > 0) {
        item.quantity = newQuantity;
      }
      recalcTotals(state);
      saveCartToLocalStorage(state);
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveCartToLocalStorage(state);
    },
  },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
