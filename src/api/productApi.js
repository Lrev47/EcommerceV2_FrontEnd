import axiosClient from './axiosClient';

/**
 * Product API client
 */
const productApi = {
  /**
   * Create a new product (admin only)
   * @param {Object} productData - Product data to create
   * @returns {Promise<Object>} - New product
   */
  createProduct: (productData) => {
    return axiosClient.post('/products', productData);
  },

  /**
   * Get all products with optional filtering
   * @param {Object} params - Query parameters for filtering, pagination, etc.
   * @returns {Promise<Array>} - List of products
   */
  getAllProducts: (params = {}) => {
    return axiosClient.get('/products', { params });
  },

  /**
   * Get product by ID
   * @param {string} id - Product ID
   * @returns {Promise<Object>} - Product
   */
  getProductById: (id) => {
    return axiosClient.get(`/products/${id}`);
  },

  /**
   * Get products by category
   * @param {string} category - Category name
   * @param {Object} params - Query parameters
   * @returns {Promise<Array>} - List of products in the category
   */
  getProductsByCategory: (category, params = {}) => {
    return axiosClient.get(`/products/category/${category}`, { params });
  },

  /**
   * Search products
   * @param {string} query - Search query
   * @param {Object} params - Additional query parameters
   * @returns {Promise<Array>} - List of matching products
   */
  searchProducts: (query, params = {}) => {
    return axiosClient.get('/products/search', { 
      params: { query, ...params } 
    });
  },

  /**
   * Update product (admin only)
   * @param {string} id - Product ID
   * @param {Object} productData - Product data to update
   * @returns {Promise<Object>} - Updated product
   */
  updateProduct: (id, productData) => {
    return axiosClient.put(`/products/${id}`, productData);
  },

  /**
   * Update product inventory (admin only)
   * @param {string} id - Product ID
   * @param {number} quantity - New quantity
   * @returns {Promise<Object>} - Updated product
   */
  updateInventory: (id, quantity) => {
    return axiosClient.patch(`/products/${id}/inventory`, { quantity });
  },

  /**
   * Delete product (admin only)
   * @param {string} id - Product ID
   * @returns {Promise<Object>} - Deleted product
   */
  deleteProduct: (id) => {
    return axiosClient.delete(`/products/${id}`);
  },

  /**
   * Update product quantity (admin only)
   * @param {string} id - Product ID
   * @param {number} quantity - New quantity
   * @returns {Promise<Object>} - Updated product
   */
  updateProductQuantity: (id, quantity) => {
    return axiosClient.patch(`/products/${id}/quantity`, { quantity });
  },

  /**
   * Update quantities for multiple products (batch update) (admin only)
   * @param {Array} updates - Array of {id, quantity} objects
   * @returns {Promise<Object>} - Result of the batch update
   */
  updateMultipleProductQuantities: (updates) => {
    return axiosClient.patch('/products/quantities', { updates });
  },

  /**
   * Check product availability
   * @param {string} id - Product ID
   * @param {number} quantity - Quantity to check
   * @returns {Promise<Object>} - Availability information
   */
  checkProductAvailability: (id, quantity) => {
    return axiosClient.get(`/products/${id}/availability`, {
      params: { quantity }
    });
  }
};

export default productApi; 