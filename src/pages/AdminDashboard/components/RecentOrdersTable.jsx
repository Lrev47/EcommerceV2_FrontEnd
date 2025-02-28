import React from 'react';
import '../styles/recentOrdersTable.css';

const RecentOrdersTable = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <p>No orders available</p>
      </div>
    );
  }

  return (
    <div className="recent-orders">
      <h3>Recent Orders</h3>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>CreatedAt</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userId}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable; 