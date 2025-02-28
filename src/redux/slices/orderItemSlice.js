import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderItemApi } from '../../api';

// Async thunks
export const createOrderItem = (arg) => async (dispatch) => {
  console.log("createOrderItem called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const fetchAllOrderItems = (arg) => async (dispatch) => {
  console.log("fetchAllOrderItems called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const fetchOrderItemById = (arg) => async (dispatch) => {
  console.log("fetchOrderItemById called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const fetchOrderItemsByOrderId = (arg) => async (dispatch) => {
  console.log("fetchOrderItemsByOrderId called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const updateOrderItem = (arg) => async (dispatch) => {
  console.log("updateOrderItem called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const deleteOrderItem = (arg) => async (dispatch) => {
  console.log("deleteOrderItem called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

const initialState = {
  orderItems: [],
  orderItemsByOrder: {},
  selectedOrderItem: null,
  loading: false,
  error: null,
};

const orderItemSlice = createSlice({
  name: 'orderItems',
  initialState,
  reducers: {
    clearSelectedOrderItem: (state) => {
      state.selectedOrderItem = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {},

});

export const { clearSelectedOrderItem, clearError } = orderItemSlice.actions;

export default orderItemSlice.reducer; 