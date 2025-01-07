// src/pages/OrderSuccessPage.jsx
import React from "react";
import { Link } from "react-router-dom";
// Optionally, if you want to read order info from Redux or location state:
// import { useSelector } from "react-redux";

const OrderSuccessPage = () => {
  // If you want final order info, you could read from Redux or route state
  // const { lastOrder } = useSelector((state) => state.order);

  return (
    <div className="order-success-page">
      <h2>Order Successful!</h2>
      <p>Thank you for your purchase. Your order has been processed.</p>

      {/* If you want to show order details:
      <p>Order ID: {lastOrder?.id}</p>
      <p>Total: ${lastOrder?.total}</p>
      */}

      <p>You will receive an email confirmation shortly.</p>
      <Link to="/orders" className="view-orders-link">
        View My Orders
      </Link>
    </div>
  );
};

export default OrderSuccessPage;
