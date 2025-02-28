import React from "react";
// import { format } from "date-fns";
import "../styles/orderDetails.css";

// Helper function to format date without date-fns
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const OrderDetails = ({ order }) => {
  if (!order) {
    return <div className="no-order">Order details not available.</div>;
  }

  return (
    <div className="order-details">
      <h3>Order Details</h3>
      
      <div className="order-header">
        <div className="order-id">
          <strong>Order ID:</strong> {order.id}
        </div>
        <div className="order-date">
          <strong>Placed on:</strong> {formatDate(order.date)}
        </div>
        <div className="order-status">
          <strong>Status:</strong> <span className={`status-${order.status.toLowerCase()}`}>{order.status}</span>
        </div>
      </div>
      
      <div className="order-items">
        <h4>Items</h4>
        {order.items.map((item) => (
          <div key={item.id} className="order-item">
            <div className="item-image">
              <img src={item.imageUrl || "/placeholder.png"} alt={item.name} />
            </div>
            <div className="item-details">
              <div className="item-name">{item.name}</div>
              <div className="item-price">${item.price.toFixed(2)}</div>
              <div className="item-quantity">Qty: {item.quantity}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="order-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>${order.shipping.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax:</span>
          <span>${order.tax.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="shipping-info">
        <h4>Shipping Information</h4>
        <p>{order.shippingAddress.name}</p>
        <p>{order.shippingAddress.street}</p>
        <p>
          {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
          {order.shippingAddress.zipCode}
        </p>
        <p>{order.shippingAddress.country}</p>
      </div>
    </div>
  );
};

export default OrderDetails; 