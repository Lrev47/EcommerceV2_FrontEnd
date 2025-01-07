// src/services/paymentService.js
import api from "./api";

/**
 * Create a new payment
 * POST /payments
 * paymentData might include { orderId, userId, stripePaymentIntent, amount, status }
 */
export async function createPayment(paymentData) {
  const response = await api.post("/payments", paymentData);
  return response.data;
}

/**
 * Confirm payment
 * POST /payments/confirm (example endpoint)
 * Expects { paymentId, paymentMethodId } in the request body
 */
export async function confirmPayment({ paymentId, paymentMethodId }) {
  // Adjust the endpoint if your backend is different
  const response = await api.post("/payments/confirm", {
    paymentId,
    paymentMethodId,
  });
  return response.data;
}

/**
 * Get all payments
 * GET /payments
 */
export async function getAllPayments() {
  const response = await api.get("/payments");
  return response.data;
}

/**
 * Get payment by ID
 * GET /payments/:paymentId
 */
export async function getPaymentById(paymentId) {
  const response = await api.get(`/payments/${paymentId}`);
  return response.data;
}

/**
 * Update payment
 * PUT /payments/:paymentId
 * e.g. to change the status from REQUIRES_ACTION to SUCCEEDED, etc.
 */
export async function updatePayment(paymentId, updateData) {
  const response = await api.put(`/payments/${paymentId}`, updateData);
  return response.data;
}

/**
 * Delete payment
 * DELETE /payments/:paymentId
 */
export async function deletePayment(paymentId) {
  const response = await api.delete(`/payments/${paymentId}`);
  return response.data;
}

/**
 * Get all payments for a specific user
 * GET /payments/user/:userId
 */
export async function getPaymentsByUser(userId) {
  const response = await api.get(`/payments/user/${userId}`);
  return response.data;
}

/**
 * Get all payments for a specific order
 * GET /payments/order/:orderId
 */
export async function getPaymentsByOrder(orderId) {
  const response = await api.get(`/payments/order/${orderId}`);
  return response.data;
}
