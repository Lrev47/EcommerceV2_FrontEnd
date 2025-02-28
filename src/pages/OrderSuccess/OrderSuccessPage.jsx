import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../../redux/slices/orderSlice";
import OrderDetails from "./components/OrderDetails";
import OrderConfirmation from "./components/OrderConfirmation";
import RecommendedProducts from "./components/RecommendedProducts";
import "./styles/orderSuccess.css";

const OrderSuccessPage = () => {
  // // const dispatch = useDispatch(); - removed - removed
  const { orderId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // useSelector hook removed - using placeholder values
  
  // useEffect removed

  if (loading && !isLoaded) {
    return (
      <div className="order-success-loading">
        <div className="loading-spinner"></div>
        <p>Loading your order information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-success-error">
        <h2>There was an error</h2>
        <p>{error}</p>
        <div className="error-actions">
          <Link to="/" className="btn-primary">Go to Homepage</Link>
          <Link to="/account/orders" className="btn-secondary">View My Orders</Link>
        </div>
      </div>
    );
  }

  if (!order && isLoaded) {
    return (
      <div className="order-success-error">
        <h2>Order Not Found</h2>
        <p>We couldn't find the order you're looking for.</p>
        <div className="error-actions">
          <Link to="/" className="btn-primary">Go to Homepage</Link>
          <Link to="/account/orders" className="btn-secondary">View My Orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-page">
      <OrderConfirmation 
        orderNumber={order?.orderNumber || order?.id} 
        date={order?.createdAt}
      />
      
      {order && (
        <OrderDetails 
          order={order} 
        />
      )}
      
      <RecommendedProducts />
      
      <div className="order-success-actions">
        <Link to="/" className="btn-primary">Continue Shopping</Link>
        <Link to="/account/orders" className="btn-secondary">View My Orders</Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage; 