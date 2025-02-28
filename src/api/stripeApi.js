import axiosClient from './axiosClient';

/**
 * Stripe API client
 */
const stripeApi = {
  /**
   * Create a payment intent
   * @param {number} amount - Amount in cents
   * @param {string} currency - Currency code (default: 'usd')
   * @param {Object} metadata - Additional metadata
   * @returns {Promise<Object>} - Payment intent
   */
  createPaymentIntent: (amount, currency = 'usd', metadata = {}) => {
    return axiosClient.post('/stripe/create-payment-intent', {
      amount,
      currency,
      metadata
    });
  },

  /**
   * Get payment intent status
   * @param {string} id - Payment intent ID
   * @returns {Promise<Object>} - Payment intent
   */
  getPaymentIntent: (id) => {
    return axiosClient.get(`/stripe/payment-intent/${id}`);
  },

  /**
   * Create a refund
   * @param {string} paymentIntentId - Payment intent ID
   * @param {number} amount - Amount to refund (optional, full amount if not specified)
   * @param {string} reason - Reason for refund (optional)
   * @returns {Promise<Object>} - Refund
   */
  createRefund: (paymentIntentId, amount, reason = 'requested_by_customer') => {
    return axiosClient.post('/stripe/refund', {
      paymentIntentId,
      amount,
      reason
    });
  },

  /**
   * Create a customer
   * @param {Object} customerData - Customer data
   * @param {string} customerData.email - Customer email
   * @param {string} customerData.name - Customer name (optional)
   * @param {Object} customerData.metadata - Additional metadata (optional)
   * @returns {Promise<Object>} - Customer
   */
  createCustomer: (customerData) => {
    return axiosClient.post('/stripe/customers', customerData);
  },

  /**
   * Save payment method
   * @param {string} customerId - Customer ID
   * @param {string} paymentMethodId - Payment method ID
   * @returns {Promise<Object>} - Result
   */
  savePaymentMethod: (customerId, paymentMethodId) => {
    return axiosClient.post('/stripe/payment-methods', {
      customerId,
      paymentMethodId
    });
  }
};

export default stripeApi; 