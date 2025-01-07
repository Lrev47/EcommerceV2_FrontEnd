// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../redux/slices/orderSlice"; // Example thunk
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const { loading, error, lastCreatedOrder } = useSelector(
    (state) => state.orders
  );

  // Simple form fields for shipping, etc.
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  // You might collect more details: city, state, zip, etc.

  useEffect(() => {
    // If user is not logged in, maybe redirect
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    // Build an order payload
    const orderData = {
      userId: userInfo?.id,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      total: totalPrice,
    };

    // Dispatch the createOrder thunk
    const resultAction = await dispatch(createOrder(orderData));
    if (createOrder.fulfilled.match(resultAction)) {
      // If success, resultAction.payload might have order ID
      // Option 1: go straight to a success page
      // navigate("/order-success");

      // Option 2: go to Payment Page
      navigate("/payment");
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {error && <div className="checkout-error">Error: {error}</div>}

      <form onSubmit={handlePlaceOrder} className="checkout-form">
        <div className="form-group">
          <label htmlFor="shippingAddress">Shipping Address</label>
          <input
            type="text"
            id="shippingAddress"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="billingAddress">Billing Address</label>
          <input
            type="text"
            id="billingAddress"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            required
          />
        </div>

        <div className="order-summary">
          <p>Items in Cart: {items.length}</p>
          <p>Total Price: ${totalPrice?.toFixed(2)}</p>
        </div>

        <button type="submit" disabled={loading || items.length === 0}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
