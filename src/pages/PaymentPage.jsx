// src/pages/PaymentPage.jsx
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Use your publishable key from .env (which might be injected at build time)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState(500); // example: $5 in cents
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");

  // Step 1: call your backend to create a Payment Intent
  const createPaymentIntent = async () => {
    try {
      // POST to your node route: /api/stripe/create-payment-intent
      // The backend code you provided is: stripeController.createPaymentIntent
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }), // pass the amount in cents
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
      setPaymentStatus("");
    } catch (err) {
      console.error(err);
    }
  };

  // Step 2: Confirm the card payment with Stripe
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    // Grab card details from <CardElement />
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    // Confirm the payment
    setPaymentStatus("Processing payment...");

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Payment error:", error.message);
      setPaymentStatus(`Payment failed: ${error.message}`);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentStatus("Payment succeeded!");
      // Possibly redirect or show a success page
    } else {
      setPaymentStatus(`Payment status: ${paymentIntent?.status}`);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Test Stripe Payment</h2>
      <label>
        Amount (cents):
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </label>
      <button onClick={createPaymentIntent}>Create Payment Intent</button>
      {clientSecret && (
        <>
          <p style={{ color: "green" }}>Client Secret: {clientSecret}</p>
          <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
              Pay
            </button>
          </form>
        </>
      )}
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
}

export default PaymentPage;
