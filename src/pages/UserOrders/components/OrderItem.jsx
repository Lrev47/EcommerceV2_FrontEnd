import React from 'react';
import OrderItemProduct from './OrderItemProduct';

const OrderItem = ({ order, isExpanded, toggleExpand }) => {
  return (
    <li className="order-item">
      <div className="order-header">
        <div className="order-header-main">
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>
            Placed: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        {/* Arrow icon to toggle expand/collapse */}
        <button
          className={`expand-btn ${isExpanded ? "expanded" : ""}`}
          onClick={() => toggleExpand(order.id)}
          aria-label="Toggle order details"
        >
          {/* Using a simple down arrow (▼); we rotate it in CSS */}
          <span className="arrow-icon">▼</span>
        </button>
      </div>

      <div className="order-body">
        <p className="order-total">Total: ${order.total.toFixed(2)}</p>

        {/* Conditionally render the items if expanded */}
        {isExpanded &&
          order.orderItems &&
          order.orderItems.length > 0 && (
            <div className="order-items">
              <h4>Items:</h4>
              <ul>
                {order.orderItems.map((item) => (
                  <OrderItemProduct key={item.id} item={item} />
                ))}
              </ul>
            </div>
          )}
      </div>
    </li>
  );
};

export default OrderItem; 