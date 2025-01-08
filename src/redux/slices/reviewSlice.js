import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getReviewsByProduct as fetchReviewsByProductService, // << rename "getReviewsByProduct" to "fetchReviewsByProductService"
  createReview as createReviewService,
  updateReview as updateReviewService,
  deleteReview as deleteReviewService,
} from "../../services/reviewService";

/**
 * Thunk: fetchReviewsByProduct
 */
export const fetchReviewsByProduct = createAsyncThunk(
  "reviews/fetchByProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await fetchReviewsByProductService(productId);
      return data; // e.g. array of reviews
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * Thunk: createReview
 */
export const createReview = createAsyncThunk(
  "reviews/createReview",
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const data = await createReviewService(productId, reviewData);
      return data; // newly created review
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * Thunk: updateReview
 */
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ reviewId, reviewData }, { rejectWithValue }) => {
    try {
      const data = await updateReviewService(reviewId, reviewData);
      return data; // updated review
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * Thunk: deleteReview
 */
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      const data = await deleteReviewService(reviewId);
      return data; // perhaps returns deleted review
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    items: [], // if you want to store fetched reviews
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ----- fetchReviewsByProduct -----
      .addCase(fetchReviewsByProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsByProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchReviewsByProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----- createReview -----
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally push the new review into state.items
        state.items.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----- updateReview -----
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        const updatedReview = action.payload;
        const idx = state.items.findIndex((r) => r.id === updatedReview.id);
        if (idx !== -1) {
          state.items[idx] = updatedReview;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----- deleteReview -----
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        // you might get an object with { id: 123 } or the full deleted review
        const deletedReview = action.payload;
        state.items = state.items.filter((r) => r.id !== deletedReview.id);
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
