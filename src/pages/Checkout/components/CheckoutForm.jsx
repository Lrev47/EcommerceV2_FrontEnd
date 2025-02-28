import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../redux/slices/orderSlice";
import AddressSelection from "./AddressSelection";
import "../styles/checkoutForm.css";

const CheckoutForm = ({ userId, items, totalPrice, loading }) => {
  // // const dispatch = useDispatch(); - removed - removed
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [notes, setNotes] = useState("");

  const handlePaymentMethodChange = $3 => {
    console.log("PaymentMethodChange handler called with:", arguments[0]);
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = $3 => {
    console.log("Submit handler called with:", arguments[0]);
    e.preventDefault();
    
    if (!selectedAddressId) {
      alert("Please select a shipping address");
      return;
    }

    const orderData = {
      userId,
      items: items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      })),
      shippingAddressId: selectedAddressId,
      paymentMethod,
      totalAmount: totalPrice,
      notes
    };

    try {
      const resultAction = await console.log("Would dispatch: createOrder(orderData"));
      if (createOrder.fulfilled.match(resultAction)) {
        navigate(`/order-success/${resultAction.payload.id}`);
      }
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>Shipping Address</h3>
        <AddressSelection 
          userId={userId}
          onSelectAddress={setSelectedAddressId}
          selectedAddressId={selectedAddressId}
        />
      </div>

      <div className="form-section">
        <h3>Payment Method</h3>
        <div className="payment-options">
          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === "creditCard"}
              onChange={handlePaymentMethodChange}
            />
            <span className="payment-label">Credit Card</span>
          </label>
          
          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={handlePaymentMethodChange}
            />
            <span className="payment-label">PayPal</span>
          </label>
          
          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="cashOnDelivery"
              checked={paymentMethod === "cashOnDelivery"}
              onChange={handlePaymentMethodChange}
            />
            <span className="payment-label">Cash on Delivery</span>
          </label>
        </div>
      </div>

      <div className="form-section">
        <h3>Order Notes</h3>
        <textarea
          className="order-notes"
          placeholder="Special instructions for delivery (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button 
        type="submit" 
        className="place-order-btn"
        disabled={loading || !selectedAddressId}
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
};

export default CheckoutForm; 