import React from "react";
import "../styles/orderSummary.css";

const OrderSummary = ({ items, totalPrice }) => {
  const subtotal = totalPrice;
  const shipping = 0; // Free shipping for now
  const tax = subtotal * 0.05; // 5% tax rate
  const total = subtotal + shipping + tax;
  
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      
      <div className="order-summary-items">
        <h4>Items ({itemCount})</h4>
        
        <div className="summary-item-list">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.size || 'default'}`} className="summary-item">
              <div className="summary-item-info">
                <div className="summary-item-name">
                  {item.product.name}
                  {item.size && <span className="summary-item-size">Size: {item.size}</span>}
                </div>
                <div className="summary-item-quantity">x{item.quantity}</div>
              </div>
              <div className="summary-item-price">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="order-totals">
        <div className="order-subtotal order-total-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="order-shipping order-total-row">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        
        <div className="order-tax order-total-row">
          <span>Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="order-total order-total-row">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="order-summary-footer">
        <div className="order-guarantee">
          <div className="guarantee-item">
            <span className="guarantee-icon">🔒</span>
            <span>Secure Checkout</span>
          </div>
          <div className="guarantee-item">
            <span className="guarantee-icon">📦</span>
            <span>Fast Shipping</span>
          </div>
          <div className="guarantee-item">
            <span className="guarantee-icon">↩️</span>
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary; 