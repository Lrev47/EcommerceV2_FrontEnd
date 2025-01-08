import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAddressesByUser as fetchAddressesByUserService,
  createAddress as createAddressService,
  updateAddress as updateAddressService,
  deleteAddress as deleteAddressService,
} from "../../services/addressService";

// Thunk: fetchAddressesByUser
export const fetchAddressesByUser = createAsyncThunk(
  "address/fetchByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await fetchAddressesByUserService(userId);
      return data; // array of addresses
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Thunk: createAddress
export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const data = await createAddressService(addressData);
      return data; // newly created address
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Thunk: updateAddress
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ addressId, addressData }, { rejectWithValue }) => {
    try {
      const data = await updateAddressService(addressId, addressData);
      return data; // updated address
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Thunk: deleteAddress
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const data = await deleteAddressService(addressId);
      return data; // possibly the deleted address object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    items: [], // user's addresses
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAddressesByUser
      .addCase(fetchAddressesByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddressesByUser.fulfilled, (state, action) => {
        console.log("fetchAddressesByUser => payload:", action.payload);
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAddressesByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createAddress
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        // Add the new address to state
        state.items.push(action.payload);
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateAddress
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAddress = action.payload;
        const index = state.items.findIndex((a) => a.id === updatedAddress.id);
        if (index !== -1) {
          state.items[index] = updatedAddress;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteAddress
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        const deletedAddress = action.payload;
        state.items = state.items.filter((a) => a.id !== deletedAddress.id);
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
