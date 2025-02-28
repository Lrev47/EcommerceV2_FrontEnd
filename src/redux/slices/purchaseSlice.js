import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { purchaseApi } from '../../api';

// Async thunks
export const checkout = (arg) => async (dispatch) => {
  console.log("checkout called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const fetchPurchaseHistory = (arg) => async (dispatch) => {
  console.log("fetchPurchaseHistory called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const fetchPurchaseDetails = (arg) => async (dispatch) => {
  console.log("fetchPurchaseDetails called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

const initialState = {
  purchaseHistory: [],
  currentPurchase: null,
  selectedPurchase: null,
  loading: false,
  error: null,
};

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    clearCurrentPurchase: (state) => {
      state.currentPurchase = null;
    },
    clearSelectedPurchase: (state) => {
      state.selectedPurchase = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {},

});

export const { clearCurrentPurchase, clearSelectedPurchase, clearError } = purchaseSlice.actions;

export default purchaseSlice.reducer; 