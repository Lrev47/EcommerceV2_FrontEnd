import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemList from "./components/CartItemList";
import CartSummary from "./components/CartSummary";
import CartActions from "./components/CartActions";
import "./styles/cart.css";

const CartPage = () => {
  // cart state from Redux
  // useSelector hook removed - using placeholder values

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart is Empty</h2>
        <Link to="/products" className="continue-shopping-link">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      
      <CartItemList items={items} />
      
      <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
      
      <CartActions />
    </div>
  );
};

export default CartPage; 