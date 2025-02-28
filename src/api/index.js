// src/api/index.js
import axiosClient from './axiosClient';

// Don't import userApi here to avoid circular dependency
// We will import it directly in components that need it

// Export axiosClient directly
export { axiosClient };

// Export the other API clients
export { default as addressApi } from './addressApi';
export { default as orderApi } from './orderApi';
export { default as orderItemApi } from './orderItemApi';
export { default as paymentApi } from './paymentApi';
export { default as productApi } from './productApi';
export { default as purchaseApi } from './purchaseApi';
export { default as reviewApi } from './reviewApi';
export { default as stripeApi } from './stripeApi';
export { default as userApi } from './userApi'; 