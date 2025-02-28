import axiosClient from './axiosClient';

/**
 * Order Item API client
 */
const orderItemApi = {
  /**
   * Create a new order item
   * @param {Object} orderItemData - Order item data to create
   * @returns {Promise<Object>} - New order item
   */
  createOrderItem: (orderItemData) => {
    return axiosClient.post('/order-items', orderItemData);
  },

  /**
   * Get all order items (admin only)
   * @returns {Promise<Array>} - List of order items
   */
  getAllOrderItems: () => {
    return axiosClient.get('/order-items');
  },

  /**
   * Get order item by ID
   * @param {string} id - Order item ID
   * @returns {Promise<Object>} - Order item
   */
  getOrderItemById: (id) => {
    return axiosClient.get(`/order-items/${id}`);
  },

  /**
   * Get order items by order ID
   * @param {string} orderId - Order ID
   * @returns {Promise<Array>} - List of order items in the order
   */
  getOrderItemsByOrderId: (orderId) => {
    return axiosClient.get(`/order-items/order/${orderId}`);
  },

  /**
   * Update order item
   * @param {string} id - Order item ID
   * @param {Object} orderItemData - Order item data to update
   * @returns {Promise<Object>} - Updated order item
   */
  updateOrderItem: (id, orderItemData) => {
    return axiosClient.put(`/order-items/${id}`, orderItemData);
  },

  /**
   * Delete order item
   * @param {string} id - Order item ID
   * @returns {Promise<Object>} - Deleted order item
   */
  deleteOrderItem: (id) => {
    return axiosClient.delete(`/order-items/${id}`);
  }
};

export default orderItemApi; 