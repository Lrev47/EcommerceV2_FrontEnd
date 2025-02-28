// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
// Import other slices as you create them:
import orderReducer from "./slices/orderSlice";
import orderItemReducer from "./slices/orderItemSlice";
import reviewReducer from "./slices/reviewSlice";
import paymentReducer from "./slices/paymentSlice";
import addressReducer from "./slices/addressSlice";
import stripeReducer from "./slices/stripeSlice";
import purchaseReducer from "./slices/purchaseSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    orderItems: orderItemReducer,
    reviews: reviewReducer,
    payment: paymentReducer,
    address: addressReducer,
    stripe: stripeReducer,
    purchase: purchaseReducer,
  },
  // Optional: Add middleware for things like logging or API integration
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Allows for non-serializable values (like File objects)
    }),
  // Optional: Enable Redux DevTools extension
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
