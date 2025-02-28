import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { stripeApi } from '../../api';

// Async thunks
export const createPaymentIntent = (arg) => async (dispatch) => {
  console.log("createPaymentIntent called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const fetchPaymentIntent = (arg) => async (dispatch) => {
  console.log("fetchPaymentIntent called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const createStripeRefund = (arg) => async (dispatch) => {
  console.log("createStripeRefund called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const createStripeCustomer = (arg) => async (dispatch) => {
  console.log("createStripeCustomer called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const savePaymentMethod = (arg) => async (dispatch) => {
  console.log("savePaymentMethod called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

const initialState = {
  paymentIntent: null,
  customer: null,
  paymentMethod: null,
  refund: null,
  loading: false,
  error: null,
};

const stripeSlice = createSlice({
  name: 'stripe',
  initialState,
  reducers: {
    clearPaymentIntent: (state) => {
      state.paymentIntent = null;
    },
    clearCustomer: (state) => {
      state.customer = null;
    },
    clearPaymentMethod: (state) => {
      state.paymentMethod = null;
    },
    clearRefund: (state) => {
      state.refund = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {},

});

export const { 
  clearPaymentIntent, 
  clearCustomer, 
  clearPaymentMethod, 
  clearRefund, 
  clearError 
} = stripeSlice.actions;

export default stripeSlice.reducer; 