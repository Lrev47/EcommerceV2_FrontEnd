import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../api';

// Async thunks
export const createOrder = (arg) => async (dispatch) => {
  console.log("createOrder called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const fetchUserOrders = (arg) => async (dispatch) => {
  console.log("fetchUserOrders called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const getAllOrders = (arg) => async (dispatch) => {
  console.log("getAllOrders called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const fetchOrderById = (arg) => async (dispatch) => {
  console.log("fetchOrderById called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

// Create an alias for fetchOrderById for backward compatibility
export const getOrderById = fetchOrderById;

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: {},

});

export const { clearCurrentOrder, resetSuccess, clearErrors } = orderSlice.actions;
export default orderSlice.reducer; 