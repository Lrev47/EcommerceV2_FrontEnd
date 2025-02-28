import axiosClient from './axiosClient';

/**
 * Order API client
 */
const orderApi = {
  /**
   * Create a new order
   * @param {Object} orderData - Order data to create
   * @returns {Promise<Object>} - New order
   */
  createOrder: (orderData) => {
    return axiosClient.post('/orders', orderData);
  },

  /**
   * Get all orders (admin only)
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} - List of orders
   */
  getAllOrders: (params = {}) => {
    return axiosClient.get('/orders', { params });
  },

  /**
   * Get order by ID
   * @param {string} id - Order ID
   * @returns {Promise<Object>} - Order
   */
  getOrderById: (id) => {
    return axiosClient.get(`/orders/${id}`);
  },

  /**
   * Get orders by user ID
   * @param {string} userId - User ID
   * @returns {Promise<Array>} - List of user's orders
   */
  getOrdersByUserId: (userId) => {
    return axiosClient.get(`/orders/user/${userId}`);
  },

  /**
   * Update order
   * @param {string} id - Order ID
   * @param {Object} orderData - Order data to update
   * @returns {Promise<Object>} - Updated order
   */
  updateOrder: (id, orderData) => {
    return axiosClient.put(`/orders/${id}`, orderData);
  },

  /**
   * Update order status
   * @param {string} id - Order ID
   * @param {string} status - New status
   * @returns {Promise<Object>} - Updated order
   */
  updateOrderStatus: (id, status) => {
    return axiosClient.patch(`/orders/${id}/status`, { status });
  },

  /**
   * Delete order
   * @param {string} id - Order ID
   * @returns {Promise<Object>} - Deleted order
   */
  deleteOrder: (id) => {
    return axiosClient.delete(`/orders/${id}`);
  }
};

export default orderApi; 