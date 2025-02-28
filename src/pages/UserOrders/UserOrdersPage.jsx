// src/pages/UserOrders/UserOrdersPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import OrderItem from "./components/OrderItem";
import "./styles/userOrders.css";

const UserOrdersPage = () => {
  // // const dispatch = useDispatch(); - removed - removed
  const navigate = useNavigate();

  // useSelector hook removed - using placeholder values
  // useSelector hook removed - using placeholder values

  // Keep track of which orders are expanded
  const [expandedOrders, setExpandedOrders] = useState([]);

  // useEffect removed

  if (!currentUser) {
    return null;
  }

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders: {error}</div>;

  if (userOrders.length === 0) {
    return <div>You have no orders yet.</div>;
  }

  // Toggle function for expand/collapse
  const toggleExpand = (orderId) => {
    setExpandedOrders((prevExpanded) => {
      if (prevExpanded.includes(orderId)) {
        // collapse if already expanded
        return prevExpanded.filter((id) => id !== orderId);
      } else {
        // expand if not in list
        return [...prevExpanded, orderId];
      }
    });
  };

  return (
    <div className="user-orders-page">
      <h2>My Orders</h2>

      <ul className="orders-list">
        {userOrders.map((order) => (
          <OrderItem 
            key={order.id}
            order={order}
            isExpanded={expandedOrders.includes(order.id)}
            toggleExpand={toggleExpand}
          />
        ))}
      </ul>
    </div>
  );
};

export default UserOrdersPage; 