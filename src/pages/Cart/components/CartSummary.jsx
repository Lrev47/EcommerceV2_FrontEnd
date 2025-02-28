import React from 'react';
import '../styles/cartSummary.css';

const CartSummary = ({ totalQuantity, totalPrice }) => {
  return (
    <div className="cart-summary">
      <p>Total Items: {totalQuantity}</p>
      <p>Total Price: ${totalPrice?.toFixed(2)}</p>
    </div>
  );
};

export default CartSummary; 