import axiosClient from './axiosClient';

/**
 * Purchase API client
 */
const purchaseApi = {
  /**
   * Process a complete purchase (checkout)
   * @param {Object} purchaseData - Purchase data
   * @param {string} purchaseData.userId - User ID
   * @param {Array} purchaseData.items - Items to purchase
   * @param {string} purchaseData.shippingAddressId - Shipping address ID
   * @param {string} purchaseData.billingAddressId - Billing address ID (optional)
   * @param {Object} purchaseData.paymentMethod - Payment method details
   * @returns {Promise<Object>} - Purchase result
   */
  checkout: (purchaseData) => {
    return axiosClient.post('/purchase/checkout', purchaseData);
  },

  /**
   * Get purchase history for a user
   * @param {string} userId - User ID
   * @returns {Promise<Array>} - Purchase history
   */
  getPurchaseHistory: (userId) => {
    return axiosClient.get(`/purchase/history/${userId}`);
  },

  /**
   * Get details of a specific purchase
   * @param {string} orderId - Order ID
   * @returns {Promise<Object>} - Purchase details
   */
  getPurchaseDetails: (orderId) => {
    return axiosClient.get(`/purchase/${orderId}`);
  }
};

export default purchaseApi; 