import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../styles/paymentForm.css";

const PaymentForm = ({ clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [statusMessage, setStatusMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = $3 => {
    console.log("Submit handler called with:", arguments[0]);
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setIsProcessing(true);
    setStatusMessage("Processing payment with pm_card_visa...");

    try {
      // Use the built-in Stripe test PaymentMethod
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: "pm_card_visa", // Stripe's test PaymentMethod
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
    } catch (err) {
      console.error("Payment processing error:", err);
      setStatusMessage(`Payment processing error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-form-wrapper">
      <div className="payment-method-info">
        <h3>Test Payment</h3>
        <p className="test-note">
          This demo automatically uses Stripe's <strong>pm_card_visa</strong> test
          method. No real payments will be processed.
        </p>
      </div>

      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="stripe-payment-element disabled-payment-element">
          <PaymentElement />
        </div>

        <div className="secure-payment-notice">
          <span className="secure-icon">🔒</span>
          <span>Your payment information is secure</span>
        </div>

        <button 
          type="submit" 
          className="payment-submit-button" 
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now (Test)"}
        </button>

        {statusMessage && (
          <div className={`payment-status-message ${isProcessing ? "processing" : ""}`}>
            {statusMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default PaymentForm; 