// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

// 1) fetchAllProducts
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllProducts();
      return data; // e.g. an array of products
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2) fetchProductById
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getProductById(id);
      return data; // single product object
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3) createNewProduct
export const createNewProduct = createAsyncThunk(
  "products/create",
  async (productData, { rejectWithValue }) => {
    try {
      const data = await createProduct(productData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ... similarly for updateProduct, deleteProduct, etc.

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // list of all products
    singleProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    // If you have synchronous product-related actions, define them here.
  },
  extraReducers: (builder) => {
    builder
      // fetchAllProducts
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // store the array of products
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleProduct = null; // clear old data if you want
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // similarly handle createNewProduct, etc.
  },
});

export default productSlice.reducer;
