// src/services/addressService.js
import api from "./api";

/**
 * Create a new address
 * POST /addresses
 */
export async function createAddress(addressData) {
  // addressData might include { userId, label, address1, city, etc. }
  const response = await api.post("/addresses", addressData);
  return response.data;
}

/**
 * Get addresses for a user
 * GET /addresses/user/:userId
 */
export async function getAddressesByUser(userId) {
  const response = await api.get(`/addresses/user/${userId}`);
  return response.data;
}

// etc.
