// src/services/userService.js
import api from "./api";

/**
 * Register a new user
 * POST /users/register
 */
export async function registerUser(formData) {
  // formData is a FormData object (including file if provided)
  const response = await api.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
/**
 * Login user
 * POST /users/login
 */
export async function loginUser(credentials) {
  // credentials: { email, password }
  const response = await api.post("/users/login", credentials);
  return response.data;
}

/**
 * Get all users
 * GET /users
 */
export async function getAllUsers() {
  const response = await api.get("/users");
  return response.data;
}

/**
 * Get user by ID
 * GET /users/:id
 */
export async function getUserById(id) {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

/**
 * Update user
 * PUT /users/:id
 */
export async function updateUser(id, updatedData) {
  // updatedData might be { firstName, lastName, username, email, password, etc. }
  const response = await api.put(`/users/${id}`, updatedData);
  return response.data;
}

/**
 * Delete user
 * DELETE /users/:id
 */
export async function deleteUser(id) {
  const response = await api.delete(`/users/${id}`);
  return response.data;
}
