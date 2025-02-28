import React, { useEffect, useState } from "react";
// Redux imports removed
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { clearCart } from "../../redux/slices/cartSlice";
import PaymentForm from "./components/PaymentForm";
import "./styles/payment.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const navigate = useNavigate();
  // // const dispatch = useDispatch(); - removed - removed
  // useSelector hook removed - using placeholder values

  const totalInCents = Math.round((totalPrice || 0) * 100);

  const [clientSecret, setClientSecret] = useState("");
  const [elementsOptions, setElementsOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect removed

  const handlePaymentSuccess = $3 => {
    console.log("PaymentSuccess handler called with:", arguments[0]);
    console.log("Would dispatch: clearCart("));
    navigate("/order-success");
  };

  if (isLoading) {
    return (
      <div className="payment-loading">
        <div className="loading-spinner"></div>
        <p>Preparing payment... (total = ${totalPrice || 0})</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-error">
        <h2>Payment Error</h2>
        <p>{error}</p>
        <button className="return-to-cart" onClick={() => navigate("/cart")}>
          Return to Cart
        </button>
      </div>
    );
  }

  if (!clientSecret || !elementsOptions) {
    return (
      <div className="payment-error">
        <h2>Payment Error</h2>
        <p>Unable to initialize payment. Please try again.</p>
        <button className="return-to-cart" onClick={() => navigate("/cart")}>
          Return to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <h2 className="payment-page-title">Complete Your Purchase</h2>
      
      <div className="payment-container">
        <div className="payment-summary">
          <h3>Order Summary</h3>
          <div className="payment-total">
            <span>Total Amount:</span>
            <span className="total-price">${totalPrice?.toFixed(2)}</span>
          </div>
        </div>

        <div className="payment-form-container">
          <Elements stripe={stripePromise} options={elementsOptions}>
            <PaymentForm 
              clientSecret={clientSecret}
              onSuccess={handlePaymentSuccess}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 