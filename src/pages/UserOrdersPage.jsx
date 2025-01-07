// src/pages/UserOrdersPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUser } from "../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";

const UserOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const { userOrders, loading, error } = useSelector((state) => state.orders);

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

  return (
    <div className="user-orders-page">
      <h2>My Orders</h2>

      <ul className="orders-list">
        {userOrders.map((order) => (
          <li key={order.id} className="order-item">
            <div className="order-header">
              <p>Order ID: {order.id}</p>
              <p>Status: {order.status}</p>
              <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="order-body">
              <p>Total: ${order.total.toFixed(2)}</p>

              {order.orderItems && order.orderItems.length > 0 && (
                <div className="order-items">
                  <h4>Items:</h4>
                  <ul>
                    {order.orderItems.map((item) => (
                      <li key={item.id}>
                        {item.quantity} x {item.product?.name} (${item.price})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserOrdersPage;
