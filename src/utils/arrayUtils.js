/**
 * Shuffles an array using Fisher-Yates (Durstenfeld) algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} A new shuffled array
 */
export function shuffle(array) {
  // Return empty array if input is not an array or is undefined
  if (!array || !Array.isArray(array)) return [];
  
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Groups array items by a specified key
 * @param {Array} array - The array to group
 * @param {string|Function} key - The key to group by or a function that returns the key
 * @returns {Object} An object with keys as group names and values as arrays of items
 */
export function groupBy(array, key) {
  if (!array || !Array.isArray(array)) return {};
  
  return array.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    // Initialize the group if it doesn't exist
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    // Add the item to the group
    result[groupKey].push(item);
    return result;
  }, {});
}

/**
 * Chunks an array into smaller arrays of specified size
 * @param {Array} array - The array to chunk
 * @param {number} size - The size of each chunk
 * @returns {Array} An array of chunks
 */
export function chunk(array, size) {
  if (!array || !Array.isArray(array) || size <= 0) return [];
  
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
} 