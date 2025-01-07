// src/services/productService.js
import api from "./api";

/**
 * Create a new product
 * POST /products
 */
export async function createProduct(productData) {
  // productData might include { name, category, price, quantity, imageUrl, etc. }
  const response = await api.post("/products", productData);
  return response.data;
}

/**
 * Get all products
 * GET /products
 */
export async function getAllProducts() {
  const response = await api.get("/products");
  return response.data;
}

/**
 * Get product by ID
 * GET /products/:id
 */
export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

/**
 * Update a product
 * PUT /products/:id
 */
export async function updateProduct(id, productData) {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
}

/**
 * Delete a product
 * DELETE /products/:id
 */
export async function deleteProduct(id) {
  const response = await api.delete(`/products/${id}`);
  return response.data;
}
