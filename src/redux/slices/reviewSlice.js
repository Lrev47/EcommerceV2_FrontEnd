import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../api';

// Async thunks
export const fetchReviewsByProduct = (arg) => async (dispatch) => {
  console.log("fetchReviewsByProduct called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

export const addReview = (arg) => async (dispatch) => {
  console.log("addReview called with:", arg);
  dispatch(setLoading(true));
  // Mock implementation here
  dispatch(setLoading(false));
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: {},

});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer; 