/**
 * Simplified localStorage utilities
 */

// Simple in-memory fallback
const memoryStorage = new Map();

/**
 * Get an item from storage
 * @param {string} key - The key to retrieve
 * @returns {string|null} - The stored value or null
 */
export const getItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.log('Storage access error:', error);
    return memoryStorage.get(key) || null;
  }
};

/**
 * Set an item in storage
 * @param {string} key - The key to store
 * @param {string} value - The value to store
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.log('Storage set error:', error);
    memoryStorage.set(key, value);
  }
};

/**
 * Remove an item from storage
 * @param {string} key - The key to remove
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log('Storage remove error:', error);
    memoryStorage.delete(key);
  }
}; 