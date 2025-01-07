// src/services/orderService.js
import api from "./api";

/**
 * Create a new order
 * POST /orders
 * orderData might include { userId, shippingAddressId, billingAddressId, items: [ { productId, quantity }, ... ] }
 */
export async function createOrder(orderData) {
  const response = await api.post("/orders", orderData);
  return response.data;
}

/**
 * Get all orders
 * GET /orders
 */
export async function getAllOrders() {
  const response = await api.get("/orders");
  return response.data;
}

/**
 * Get order by ID
 * GET /orders/:orderId
 */
export async function getOrderById(orderId) {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
}

/**
 * Update an order
 * PUT /orders/:orderId
 * e.g. to update status, shippingAddressId, billingAddressId, etc.
 */
export async function updateOrder(orderId, updateData) {
  const response = await api.put(`/orders/${orderId}`, updateData);
  return response.data;
}

/**
 * Delete an order
 * DELETE /orders/:orderId
 */
export async function deleteOrder(orderId) {
  const response = await api.delete(`/orders/${orderId}`);
  return response.data;
}

/**
 * Get all orders for a specific user
 * GET /orders/user/:userId
 */
export async function getOrdersByUser(userId) {
  const response = await api.get(`/orders/user/${userId}`);
  return response.data;
}
