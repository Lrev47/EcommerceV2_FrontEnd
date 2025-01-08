// src/services/addressService.js
import api from "./api";

export async function fetchAddressesByUser(userId) {
  // GET /api/addresses/user/:userId
  const response = await api.get(`/addresses/user/${userId}`);
  return response.data; // array of addresses
}

export async function createAddress(addressData) {
  // POST /api/addresses
  const response = await api.post("/addresses", addressData);
  return response.data; // newly created address
}

export async function updateAddress(addressId, addressData) {
  // PUT /api/addresses/:addressId
  const response = await api.put(`/addresses/${addressId}`, addressData);
  return response.data; // updated address
}

export async function deleteAddress(addressId) {
  // DELETE /api/addresses/:addressId
  const response = await api.delete(`/addresses/${addressId}`);
  return response.data; // possibly the deleted address
}
