import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../api';

// Async thunks
export const fetchUserAddresses = (arg) => async (dispatch) => {
  console.log("fetchUserAddresses called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

// Create an alias for fetchUserAddresses for backward compatibility
export const fetchAddressesByUser = fetchUserAddresses;
// Create another alias for backward compatibility
export const getUserAddresses = fetchUserAddresses;

export const addAddress = (arg) => async (dispatch) => {
  console.log("addAddress called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

// Create an alias for addAddress for backward compatibility
export const createAddress = addAddress;

export const updateAddress = (arg) => async (dispatch) => {
  console.log("updateAddress called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const deleteAddress = (arg) => async (dispatch) => {
  console.log("deleteAddress called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
    selectedAddress: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    selectAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    clearSelectedAddress: (state) => {
      state.selectedAddress = null;
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

export const { selectAddress, clearSelectedAddress, resetSuccess, clearErrors } = addressSlice.actions;
export default addressSlice.reducer; 