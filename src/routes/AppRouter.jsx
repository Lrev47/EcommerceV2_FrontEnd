import React from "react";
import { Routes, Route } from "react-router-dom";

// Import your page components
import HomePage from "../pages/HomePage";
import ProductListingPage from "../pages/ProductListingPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserAccountPage from "../pages/UserAccountPage";
import UserOrdersPage from "../pages/UserOrdersPage";
import PaymentPage from "../pages/PaymentPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
// ... Add any other pages you have (LoginPage, RegisterPage, etc.)

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/account" element={<UserAccountPage />} />
      <Route path="/orders" element={<UserOrdersPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />

      {/* You can add catch-all or 404 route if needed:
        <Route path="*" element={<NotFoundPage />} />
        */}
    </Routes>
  );
};

export default AppRouter;
