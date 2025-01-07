// src/redux/slices/paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPayment as createPaymentService,
  confirmPayment as confirmPaymentService,
} from "../../services/paymentService";

/**
 * createPayment thunk:
 * Sends { orderId, userId, amount, etc. } to create a payment on the server
 */
export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await createPaymentService(paymentData);
      // e.g. { id, stripePaymentIntent, amount, status }
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * confirmPayment thunk:
 * Expects { paymentId, paymentMethodId } to confirm the payment
 */
export const confirmPayment = createAsyncThunk(
  "payment/confirmPayment",
  async ({ paymentId, paymentMethodId }, { rejectWithValue }) => {
    try {
      const response = await confirmPaymentService({
        paymentId,
        paymentMethodId,
      });
      // e.g. { status: 'SUCCEEDED' } from the server
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentId: null,
    paymentIntentClientSecret: null,
    amount: 0,
    status: null, // e.g. 'REQUIRES_PAYMENT_METHOD', 'SUCCEEDED', etc.
    loading: false,
    error: null,
  },
  reducers: {
    // You can add a resetPayment action if needed
  },
  extraReducers: (builder) => {
    builder
      // createPayment
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        // e.g. store necessary data
        const { id, stripePaymentIntent, amount, status } = action.payload;
        state.paymentId = id;
        state.paymentIntentClientSecret = stripePaymentIntent;
        state.amount = amount;
        state.status = status;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // confirmPayment
      .addCase(confirmPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.loading = false;
        // e.g. if the server returns { status: "SUCCEEDED" }
        state.status = action.payload.status;
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
