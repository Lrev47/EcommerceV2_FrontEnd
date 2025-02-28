import React from "react";
// import { format } from "date-fns";
import "../styles/orderConfirmation.css";

// Helper function to format date without date-fns
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const OrderConfirmation = ({ orderNumber, date }) => {
  return (
    <div className="order-confirmation">
      <div className="confirmation-icon">
        <i className="fas fa-check-circle"></i>
      </div>
      <h2>Order Confirmed!</h2>
      <p>
        Thank you for your purchase. Your order has been received and is being
        processed.
      </p>
      <div className="order-info">
        <p>
          <strong>Order Number:</strong> {orderNumber}
        </p>
        <p>
          <strong>Date:</strong> {formatDate(date)}
        </p>
      </div>
      <p>A confirmation email has been sent to your registered email address.</p>
    </div>
  );
};

export default OrderConfirmation; 