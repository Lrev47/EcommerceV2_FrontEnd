import axiosClient from './axiosClient';

/**
 * Address API client
 */
const addressApi = {
  /**
   * Create a new address
   * @param {Object} addressData - Address data to create
   * @returns {Promise<Object>} - New address
   */
  createAddress: (addressData) => {
    return axiosClient.post('/addresses', addressData);
  },

  /**
   * Get all addresses (admin only)
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} - List of addresses
   */
  getAllAddresses: (params = {}) => {
    return axiosClient.get('/addresses', { params });
  },

  /**
   * Get address by ID
   * @param {string} id - Address ID
   * @returns {Promise<Object>} - Address
   */
  getAddressById: (id) => {
    return axiosClient.get(`/addresses/${id}`);
  },

  /**
   * Get addresses by user ID
   * @param {string} userId - User ID
   * @returns {Promise<Array>} - List of user's addresses
   */
  getAddressesByUserId: (userId) => {
    return axiosClient.get(`/addresses/user/${userId}`);
  },

  /**
   * Update address
   * @param {string} id - Address ID
   * @param {Object} addressData - Address data to update
   * @returns {Promise<Object>} - Updated address
   */
  updateAddress: (id, addressData) => {
    return axiosClient.put(`/addresses/${id}`, addressData);
  },

  /**
   * Delete address
   * @param {string} id - Address ID
   * @returns {Promise<Object>} - Deleted address
   */
  deleteAddress: (id) => {
    return axiosClient.delete(`/addresses/${id}`);
  }
};

export default addressApi; 