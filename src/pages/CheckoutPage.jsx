// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../redux/slices/orderSlice"; // Example thunk
import { fetchAddressesByUser } from "../redux/slices/addressSlice"; // fetch user addresses
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  // Addresses from Redux
  const { items: addressList, loading: addressLoading } = useSelector(
    (state) => state.address
  );

  const { loading: orderLoading, error: orderError } = useSelector(
    (state) => state.orders
  );

  // For storing selected shipping/billing addresses
  const [shippingAddressId, setShippingAddressId] = useState("");
  const [billingAddressId, setBillingAddressId] = useState("");

  // OPTIONAL: store a "new" address if user wants to type a custom one
  const [customShipping, setCustomShipping] = useState("");
  const [customBilling, setCustomBilling] = useState("");

  useEffect(() => {
    // If user is not logged in, redirect
    if (!userInfo) {
      navigate("/login");
    } else {
      // fetch the user’s addresses
      dispatch(fetchAddressesByUser(userInfo.id));
    }
  }, [userInfo, navigate, dispatch]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Build an order payload
    // 1) If shippingAddressId is chosen, we can store that as shippingAddressId
    // or if the user typed customShipping, we store that text
    const shippingAddress = addressList.find(
      (addr) => addr.id === Number(shippingAddressId)
    );

    const billingAddress = addressList.find(
      (addr) => addr.id === Number(billingAddressId)
    );

    // We’ll send the entire address object or an ID to the backend,
    // depending on how your backend expects it. For example:
    const orderData = {
      userId: userInfo?.id,
      shippingAddressId: shippingAddress?.id || null,
      billingAddressId: billingAddress?.id || null,
      // or store the custom typed address if no ID selected
      shippingAddressText: customShipping,
      billingAddressText: customBilling,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      total: totalPrice,
    };

    const resultAction = await dispatch(createOrder(orderData));
    if (createOrder.fulfilled.match(resultAction)) {
      // Navigate to next step (Payment or Order Success)
      navigate("/payment");
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {orderError && <div className="checkout-error">Error: {orderError}</div>}

      {/* If address is loading, show a spinner (optional) */}
      {addressLoading && <p>Loading your addresses...</p>}

      <form onSubmit={handlePlaceOrder} className="checkout-form">
        <div className="form-group">
          <label>Shipping Address</label>
          {/* 1) Let user choose from existing addresses */}
          <select
            value={shippingAddressId}
            onChange={(e) => {
              setShippingAddressId(e.target.value);
              setCustomShipping("");
            }}
          >
            <option value="">-- Select Saved Address --</option>
            {addressList.map((addr) => (
              <option key={addr.id} value={addr.id}>
                {addr.address1}, {addr.city}, {addr.state} {addr.zipcode},{" "}
                {addr.country}
              </option>
            ))}
          </select>

          {/* 2) Or type a custom shipping address */}
          <p style={{ margin: "0.5rem 0" }}>Or type a new one:</p>
          <input
            type="text"
            placeholder="Enter a new shipping address"
            value={customShipping}
            onChange={(e) => {
              setCustomShipping(e.target.value);
              setShippingAddressId(""); // if user types custom, reset the select
            }}
          />
        </div>

        <div className="form-group">
          <label>Billing Address</label>
          <select
            value={billingAddressId}
            onChange={(e) => {
              setBillingAddressId(e.target.value);
              setCustomBilling("");
            }}
          >
            <option value="">-- Select Saved Address --</option>
            {addressList.map((addr) => (
              <option key={addr.id} value={addr.id}>
                {addr.address1}, {addr.city}, {addr.state} {addr.zipcode},{" "}
                {addr.country}
              </option>
            ))}
          </select>

          <p style={{ margin: "0.5rem 0" }}>Or type a new one:</p>
          <input
            type="text"
            placeholder="Enter a new billing address"
            value={customBilling}
            onChange={(e) => {
              setCustomBilling(e.target.value);
              setBillingAddressId("");
            }}
          />
        </div>

        <div className="order-summary">
          <p>Items in Cart: {items.length}</p>
          <p>Total Price: ${totalPrice?.toFixed(2)}</p>
        </div>

        <button
          type="submit"
          disabled={orderLoading || items.length === 0}
          className="checkout-button"
        >
          {orderLoading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
