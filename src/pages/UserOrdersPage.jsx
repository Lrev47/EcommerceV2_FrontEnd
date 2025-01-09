// src/pages/UserOrdersPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUser } from "../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";

const UserOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const { userOrders, loading, error } = useSelector((state) => state.orders);

  // Keep track of which orders are expanded
  const [expandedOrders, setExpandedOrders] = useState([]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(getOrdersByUser(userInfo.id));
    }
  }, [userInfo, dispatch, navigate]);

  if (!userInfo) {
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
        {userOrders.map((order) => {
          const isExpanded = expandedOrders.includes(order.id);
          return (
            <li key={order.id} className="order-item">
              <div className="order-header">
                <div className="order-header-main">
                  <p>Order ID: {order.id}</p>
                  <p>Status: {order.status}</p>
                  <p>
                    Placed: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {/* Arrow icon to toggle expand/collapse */}
                <button
                  className={`expand-btn ${isExpanded ? "expanded" : ""}`}
                  onClick={() => toggleExpand(order.id)}
                  aria-label="Toggle order details"
                >
                  {/* Using a simple down arrow (▼); we rotate it in CSS */}
                  <span className="arrow-icon">▼</span>
                </button>
              </div>

              <div className="order-body">
                <p className="order-total">Total: ${order.total.toFixed(2)}</p>

                {/* Conditionally render the items if expanded */}
                {isExpanded &&
                  order.orderItems &&
                  order.orderItems.length > 0 && (
                    <div className="order-items">
                      <h4>Items:</h4>
                      <ul>
                        {order.orderItems.map((item) => (
                          <li key={item.id} className="order-product">
                            <div className="product-image">
                              <img
                                src={item.product?.imageUrl}
                                alt={item.product?.name}
                              />
                            </div>
                            <div className="product-info">
                              <p className="product-name">
                                {item.product?.name}
                              </p>
                              <p>
                                Qty: {item.quantity} · ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserOrdersPage;
