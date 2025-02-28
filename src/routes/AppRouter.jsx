import React from "react";
import { Routes, Route } from "react-router-dom";

// Import your page components
import {
  HomePage,
  ProductListingPage,
  ProductDetailPage,
  LoginPage,
  RegisterPage,
  UserAccountPage,
  UserOrdersPage,
  PaymentPage,
  OrderSuccessPage,
  CartPage,
  CheckoutPage,
  AdminDashboardPage
} from "../pages";
// ... Add any other pages you have (LoginPage, RegisterPage, etc.)

// 404 Page Component
const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px 20px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/" style={{ 
        display: 'inline-block', 
        marginTop: '20px',
        padding: '10px 20px',
        background: '#1a73e8',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px'
      }}>
        Go to Homepage
      </a>
    </div>
  );
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListingPage />} />
      <Route
        path="/products/category/:category"
        element={<ProductListingPage />}
      />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/account" element={<UserAccountPage />} />
      <Route path="/orders" element={<UserOrdersPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />

      {/* 404 Route - Must be last */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
