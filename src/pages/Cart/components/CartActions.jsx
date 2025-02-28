import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../../redux/slices/cartSlice';
import '../styles/cartActions.css';

const CartActions = () => {
  // // const dispatch = useDispatch(); - removed - removed
  const navigate = useNavigate();

  const handleClearCart = $3 => {
    console.log("ClearCart handler called with:", arguments[0]);
    console.log("Would dispatch: clearCart("));
  };

  const handleProceedToCheckout = $3 => {
    console.log("ProceedToCheckout handler called with:", arguments[0]);
    navigate("/checkout");
  };

  return (
    <div className="cart-actions">
      <button onClick={handleClearCart} className="clear-cart-button">
        Clear Cart
      </button>
      <button onClick={handleProceedToCheckout} className="checkout-button">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartActions; 