// src/pages/CartPage.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateItemQuantity,
  removeItem,
  clearCart,
} from "../redux/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // cart state from Redux
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

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

  const handleQuantityChange = (productId, newQty) => {
    if (newQty <= 0) return;
    dispatch(updateItemQuantity({ productId, newQuantity: newQty }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeItem(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.productId} className="cart-item">
            <div className="item-info">
              <p className="item-name">{item.name}</p>
              <p className="item-price">Price: ${item.price?.toFixed(2)}</p>
            </div>
            <div className="item-quantity">
              <label>Qty:</label>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.productId, Number(e.target.value))
                }
              />
            </div>
            <div className="item-remove">
              <button onClick={() => handleRemoveItem(item.productId)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p>Total Items: {totalQuantity}</p>
        <p>Total Price: ${totalPrice?.toFixed(2)}</p>
      </div>

      <div className="cart-actions">
        <button onClick={handleClearCart} className="clear-cart-button">
          Clear Cart
        </button>
        <button onClick={handleProceedToCheckout} className="checkout-button">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
