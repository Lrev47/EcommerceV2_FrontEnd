import axiosClient from './axiosClient';

/**
 * Payment API client
 */
const paymentApi = {
  /**
   * Create a new payment
   * @param {Object} paymentData - Payment data to create
   * @returns {Promise<Object>} - New payment
   */
  createPayment: (paymentData) => {
    return axiosClient.post('/payments', paymentData);
  },

  /**
   * Get all payments (admin only)
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} - List of payments
   */
  getAllPayments: (params = {}) => {
    return axiosClient.get('/payments', { params });
  },

  /**
   * Get payment by ID
   * @param {string} id - Payment ID
   * @returns {Promise<Object>} - Payment
   */
  getPaymentById: (id) => {
    return axiosClient.get(`/payments/${id}`);
  },

  /**
   * Get payments by order ID
   * @param {string} orderId - Order ID
   * @returns {Promise<Array>} - List of payments for the order
   */
  getPaymentsByOrderId: (orderId) => {
    return axiosClient.get(`/payments/order/${orderId}`);
  },

  /**
   * Update payment
   * @param {string} id - Payment ID
   * @param {Object} paymentData - Payment data to update
   * @returns {Promise<Object>} - Updated payment
   */
  updatePayment: (id, paymentData) => {
    return axiosClient.put(`/payments/${id}`, paymentData);
  },

  /**
   * Update payment status
   * @param {string} id - Payment ID
   * @param {string} status - New status
   * @returns {Promise<Object>} - Updated payment
   */
  updatePaymentStatus: (id, status) => {
    return axiosClient.patch(`/payments/${id}/status`, { status });
  },

  /**
   * Delete payment
   * @param {string} id - Payment ID
   * @returns {Promise<Object>} - Deleted payment
   */
  deletePayment: (id) => {
    return axiosClient.delete(`/payments/${id}`);
  }
};

export default paymentApi; 