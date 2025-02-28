import { createSlice } from '@reduxjs/toolkit';

// Initial state with minimal required fields
const initialState = {
  currentUser: null,
  users: [],
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Simple slice with basic structure
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Basic user actions
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

// Export actions
export const { 
  setUser, 
  setUsers, 
  setLoading, 
  setError, 
  clearError, 
  logout 
} = userSlice.actions;

// Placeholder async functions that will be implemented later
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log('Login attempted with:', credentials);
    // API call will go here
    
    // For now, simulate success with mock data
    setTimeout(() => {
      dispatch(setUser({ id: 1, name: 'User', email: credentials.email }));
    }, 1000);
  } catch (error) {
    dispatch(setError('Login failed'));
    console.error('Login error:', error);
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log('Registration attempted with:', userData);
    // API call will go here
    
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError('Registration failed'));
    console.error('Registration error:', error);
  }
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log('Getting current user');
    // API call will go here
  } catch (error) {
    dispatch(setError('Failed to fetch user'));
    console.error('Get user error:', error);
  }
};

export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log('Updating profile with:', userData);
    // API call will go here
  } catch (error) {
    dispatch(setError('Failed to update profile'));
    console.error('Update profile error:', error);
  }
};

export const updateUserPassword = (passwordData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log('Updating password:', passwordData);
    // API call will go here
  } catch (error) {
    dispatch(setError('Failed to update password'));
    console.error('Update password error:', error);
  }
};

export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log('Fetching all users');
    // API call will go here
    
    // For now, return empty array
    setTimeout(() => {
      dispatch(setUsers([]));
    }, 1000);
  } catch (error) {
    dispatch(setError('Failed to fetch users'));
    console.error('Fetch users error:', error);
  }
};

export default userSlice.reducer; 