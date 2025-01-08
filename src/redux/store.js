// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
// Import other slices as you create them:
import orderReducer from "./slices/orderSlice";
import reviewReducer from "./slices/reviewSlice";
import paymentReducer from "./slices/paymentSlice";
import addressReducer from "./slices/addressSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    reviews: reviewReducer,
    payment: paymentReducer,
    address: addressReducer,
  },
});

export default store;
