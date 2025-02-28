import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressSelection from "./components/AddressSelection";
import OrderSummary from "./components/OrderSummary";
import CheckoutForm from "./components/CheckoutForm";
import "./styles/checkout.css";

const CheckoutPage = () => {
  const navigate = useNavigate();

  // useSelector hook removed - using placeholder values
  // useSelector hook removed - using placeholder values
  // useSelector hook removed - using placeholder values

  // useEffect removed

  if (!userInfo || items.length === 0) {
    return null; // or a loading spinner
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {orderError && <div className="checkout-error">Error: {orderError}</div>}

      <div className="checkout-container">
        <div className="checkout-main">
          <CheckoutForm 
            userId={userInfo?.id}
            items={items}
            totalPrice={totalPrice}
            loading={orderLoading}
          />
        </div>
        
        <div className="checkout-sidebar">
          <OrderSummary 
            items={items} 
            totalPrice={totalPrice} 
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 