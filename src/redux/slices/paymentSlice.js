import { createSlice } from '@reduxjs/toolkit';

// Helper action to set loading state
const setLoading = (loading) => ({
  type: 'payment/setLoading',
  payload: loading
});

// Simplified async thunks without timeout
export const createPaymentIntent = (arg) => (dispatch) => {
  console.log("createPaymentIntent called with:", arg);
  dispatch(setLoading(true));
  
  // Return mock success response
  const mockResponse = {
    success: true,
    clientSecret: 'mock_client_secret',
    amount: arg.amount
  };
  
  dispatch(setLoading(false));
  return mockResponse;
};

export const processPayment = (arg) => (dispatch) => {
  console.log("processPayment called with:", arg);
  dispatch(setLoading(true));
  
  // Return mock success response
  const mockResponse = {
    success: true,
    paymentId: 'mock_payment_id',
    status: 'succeeded'
  };
  
  dispatch(setLoading(false));
  return mockResponse;
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentIntent: null,
    paymentSuccess: false,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearPaymentState: (state) => {
      state.paymentIntent = null;
      state.paymentSuccess = false;
      state.error = null;
    },
    resetPaymentSuccess: (state) => {
      state.paymentSuccess = false;
    },
  },
  extraReducers: {},
});

export const { clearPaymentState, resetPaymentSuccess } = paymentSlice.actions;
export default paymentSlice.reducer; 