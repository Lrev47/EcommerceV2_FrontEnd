// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser as loginUserService,
  registerUser as registerUserService,
  updateUser as updateUserService,
  getAllUsers as getAllUsersService,
} from "../../services/userService";
import api from "../../services/api"; // Your axios instance for setting headers, etc.

// ========== loginUser Thunk ==========
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      // Suppose the response is { token, user: {...} }
      const data = await loginUserService(credentials);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ========== registerUser Thunk ==========
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUserService(userData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ========== updateUser Thunk ==========
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, ...updateData }, { rejectWithValue }) => {
    try {
      const response = await updateUserService(id, updateData);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ========== fetchAllUsers Thunk ==========
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllUsersService();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    token: null,
    allUsers: [],
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    /**
     * setUserFromStorage: used when rehydrating user from localStorage
     */
    setUserFromStorage(state, action) {
      const { token, user } = action.payload;
      state.token = token;
      state.userInfo = user;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== loginUser =====
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // Expecting action.payload => { token, user }
        const { token, user } = action.payload;
        state.token = token;
        state.userInfo = user;

        // Store in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Optionally set default Auth header so subsequent requests are authenticated
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== registerUser =====
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // Suppose register also returns { token, user }, or at least a user
        const { token, user } = action.payload;
        state.token = token || null;
        state.userInfo = user;

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== updateUser =====
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== fetchAllUsers =====
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload; // array of users
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
