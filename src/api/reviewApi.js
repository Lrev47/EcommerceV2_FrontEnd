import axiosClient from './axiosClient';

/**
 * Review API client
 */
const reviewApi = {
  /**
   * Create a new review
   * @param {Object} reviewData - Review data to create
   * @returns {Promise<Object>} - New review
   */
  createReview: (reviewData) => {
    return axiosClient.post('/reviews', reviewData);
  },

  /**
   * Get all reviews
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} - List of reviews
   */
  getAllReviews: (params = {}) => {
    return axiosClient.get('/reviews', { params });
  },

  /**
   * Get review by ID
   * @param {string} id - Review ID
   * @returns {Promise<Object>} - Review
   */
  getReviewById: (id) => {
    return axiosClient.get(`/reviews/${id}`);
  },

  /**
   * Get reviews by product ID
   * @param {string} productId - Product ID
   * @returns {Promise<Array>} - List of reviews for the product
   */
  getReviewsByProductId: (productId) => {
    return axiosClient.get(`/reviews/product/${productId}`);
  },

  /**
   * Get reviews by user ID
   * @param {string} userId - User ID
   * @returns {Promise<Array>} - List of reviews by the user
   */
  getReviewsByUserId: (userId) => {
    return axiosClient.get(`/reviews/user/${userId}`);
  },

  /**
   * Update review
   * @param {string} id - Review ID
   * @param {Object} reviewData - Review data to update
   * @returns {Promise<Object>} - Updated review
   */
  updateReview: (id, reviewData) => {
    return axiosClient.put(`/reviews/${id}`, reviewData);
  },

  /**
   * Delete review
   * @param {string} id - Review ID
   * @returns {Promise<Object>} - Deleted review
   */
  deleteReview: (id) => {
    return axiosClient.delete(`/reviews/${id}`);
  }
};

export default reviewApi; 