// src/pages/PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPayment, confirmPayment } from "../redux/slices/paymentSlice";
// ^ Example thunks you'd have in paymentSlice
import { clearCart } from "../redux/slices/cartSlice";
// or your own logic to handle cart clearing

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const { paymentIntentClientSecret, paymentId, loading, error, status } =
    useSelector((state) => state.payment);

  // For a simple card input simulation
  const [cardNumber, setCardNumber] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");

  useEffect(() => {
    if (!userInfo) {
      // If user not logged in, redirect to login
      navigate("/login");
    }
  }, [userInfo, navigate]);

  // Hypothetical function to create a payment intent or payment record
  const handleCreatePayment = () => {
    // E.g., your backend might need order ID, user ID, total amount, etc.
    dispatch(
      createPayment({
        orderId: 123, // or from Redux order state
        userId: userInfo?.id,
        amount: 49.99, // example
        // any other required fields
      })
    );
  };

  // Hypothetical confirm function (Stripe-like flow)
  const handleConfirmPayment = async () => {
    if (!paymentId) return;
    // Typically you'd pass the paymentMethodId from Stripe elements, etc.
    dispatch(confirmPayment({ paymentId, paymentMethodId: "pm_fakeCard123" }));
  };

  // If payment succeeded, you might redirect or show success
  useEffect(() => {
    if (status === "SUCCEEDED") {
      // Clear cart if you want
      dispatch(clearCart());
      // Navigate to success page with or without order details
      navigate("/order-success");
    }
  }, [status, navigate, dispatch]);

  return (
    <div className="payment-page-container">
      <h2>Payment</h2>
      {error && <div className="payment-error">Error: {error}</div>}

      <div className="payment-info">
        <label>Card Number</label>
        <input
          type="text"
          placeholder="4242 4242 4242 4242"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <label>Expiry Date</label>
        <input
          type="text"
          placeholder="12/34"
          value={cardExpiry}
          onChange={(e) => setCardExpiry(e.target.value)}
        />

        <label>CVC</label>
        <input
          type="text"
          placeholder="123"
          value={cardCvc}
          onChange={(e) => setCardCvc(e.target.value)}
        />
      </div>

      <div className="payment-actions">
        <button onClick={handleCreatePayment} disabled={loading || !userInfo}>
          {loading ? "Creating Payment..." : "Create Payment Intent"}
        </button>

        {/* If your flow requires a confirm step */}
        <button
          onClick={handleConfirmPayment}
          disabled={loading || !paymentIntentClientSecret}
        >
          {loading ? "Confirming Payment..." : "Confirm Payment"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
