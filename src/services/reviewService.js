// src/services/reviewService.js
import api from "./api";

/**
 * Create a new review
 * POST /reviews
 * reviewData might be { userId, productId, starRating, comment }
 */
export async function createReview(reviewData) {
  const response = await api.post("/reviews", reviewData);
  return response.data;
}

/**
 * Get all reviews
 * GET /reviews
 */
export async function getAllReviews() {
  const response = await api.get("/reviews");
  return response.data;
}

/**
 * Get reviews for a specific product
 * GET /reviews/product/:productId
 */
export async function getReviewsByProduct(productId) {
  const response = await api.get(`/reviews/product/${productId}`);
  return response.data;
}

/**
 * Get reviews by user
 * GET /reviews/user/:userId
 */
export async function getReviewsByUser(userId) {
  const response = await api.get(`/reviews/user/${userId}`);
  return response.data;
}

/**
 * Get review by ID
 * GET /reviews/:reviewId
 */
export async function getReviewById(reviewId) {
  const response = await api.get(`/reviews/${reviewId}`);
  return response.data;
}

/**
 * Update review
 * PUT /reviews/:reviewId
 */
export async function updateReview(reviewId, updateData) {
  const response = await api.put(`/reviews/${reviewId}`, updateData);
  return response.data;
}

/**
 * Delete review
 * DELETE /reviews/:reviewId
 */
export async function deleteReview(reviewId) {
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
}
