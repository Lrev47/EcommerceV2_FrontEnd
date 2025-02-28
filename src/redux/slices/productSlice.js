import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productApi } from '../../api';

// Async thunks
export const fetchAllProducts = (arg) => async (dispatch) => {
  console.log("fetchAllProducts called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const fetchProductById = (arg) => async (dispatch) => {
  console.log("fetchProductById called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const fetchProductsByCategory = (arg) => async (dispatch) => {
  console.log("fetchProductsByCategory called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const searchProducts = (arg) => async (dispatch) => {
  console.log("searchProducts called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const createProduct = (arg) => async (dispatch) => {
  console.log("createProduct called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const updateProduct = (arg) => async (dispatch) => {
  console.log("updateProduct called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const deleteProduct = (arg) => async (dispatch) => {
  console.log("deleteProduct called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

const initialState = {
  products: [],
  selectedProduct: null,
  categoryProducts: {},
  searchResults: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {},

});

export const { clearSelectedProduct, clearSearchResults, clearError } = productSlice.actions;

export const {
  setFilters,
  clearFilters,
  resetProductState
} = productSlice.actions;

// Aliases for backward compatibility
export const getProductById = fetchProductById;
export const getProductsByCategory = fetchProductsByCategory;

export default productSlice.reducer; 