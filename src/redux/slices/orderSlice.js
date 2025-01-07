// src/redux/slices/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOrdersByUser as getOrdersByUserService,
  createOrder as createOrderService,
  getAllOrders as getAllOrdersService, // <-- Add this import if you have getAllOrders in orderService.js
} from "../../services/orderService";

/**
 * Thunk: getOrdersByUser
 */
export const getOrdersByUser = createAsyncThunk(
  "orders/getOrdersByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getOrdersByUserService(userId);
      return data; // array of orders for that user
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * Thunk: createOrder
 */
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const result = await createOrderService(orderData);
      return result; // newly created order object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * Thunk: getAllOrders
 * For admin usage to fetch ALL orders from the backend (GET /orders).
 */
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllOrdersService();
      return data; // array of all orders
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    // For user-specific orders
    userOrders: [],

    // Store the newly created order if desired
    lastCreatedOrder: null,

    // For admin usage, if you want to store all orders
    allOrders: [],

    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ========== getOrdersByUser ==========
      .addCase(getOrdersByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(getOrdersByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== createOrder ==========
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.lastCreatedOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== getAllOrders (ADMIN) ==========
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        // Store the array of all orders in state
        state.allOrders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
