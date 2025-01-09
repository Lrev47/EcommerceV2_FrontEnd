// src/pages/PaymentPage.jsx

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // 1) import useDispatch
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { clearCart } from "../redux/slices/cartSlice"; // 2) import clearCart

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function PaymentPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // 3) get dispatch
  const { totalPrice } = useSelector((state) => state.cart);

  const totalInCents = Math.round((totalPrice || 0) * 100);

  const [clientSecret, setClientSecret] = useState("");
  const [elementsOptions, setElementsOptions] = useState(null);

  useEffect(() => {
    if (!totalInCents) return;

    const createPaymentIntent = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/stripe/create-payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: totalInCents }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to create Payment Intent");
        }
        const data = await response.json();
        if (!data.clientSecret) {
          throw new Error("No clientSecret returned");
        }

        setClientSecret(data.clientSecret);
        setElementsOptions({
          clientSecret: data.clientSecret,
          appearance: { theme: "stripe" },
        });
      } catch (err) {
        console.error("Error creating PaymentIntent:", err);
      }
    };

    createPaymentIntent();
  }, [totalInCents]);

  if (!clientSecret || !elementsOptions) {
    return <div>Preparing payment... (total = ${totalPrice || 0})</div>;
  }

  return (
    <div className="payment-page-container">
      <h2 className="payment-page-title">Stripe Payment</h2>
      <Elements stripe={stripePromise} options={elementsOptions}>
        <HardcodedCardForm
          clientSecret={clientSecret}
          onSuccess={() => {
            // 4) On success, cart is cleared, then navigate
            dispatch(clearCart()); // empty the cart
            navigate("/order-success");
          }}
        />
      </Elements>
    </div>
  );
}

function HardcodedCardForm({ clientSecret, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setStatusMessage("Processing payment with pm_card_visa...");

    // Use the built-in Stripe test PaymentMethod
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: "pm_card_visa", // test PaymentMethod
      }
    );

    if (error) {
      console.error("Payment error:", error.message);
      setStatusMessage(`Payment failed: ${error.message}`);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      setStatusMessage("Payment succeeded!");
      if (onSuccess) onSuccess(); // call the success callback
    } else {
      setStatusMessage(`Payment status: ${paymentIntent?.status}`);
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <p style={{ fontStyle: "italic" }}>
        This demo automatically uses Stripe’s <strong>pm_card_visa</strong> test
        method, ignoring any typed input.
      </p>

      <div className="stripe-payment-element disabled-payment-element">
        <PaymentElement />
      </div>

      <button className="payment-submit-button" disabled={!stripe}>
        Pay Now (Test)
      </button>

      {statusMessage && (
        <p className="payment-status-message">{statusMessage}</p>
      )}
    </form>
  );
}

export default PaymentPage;
