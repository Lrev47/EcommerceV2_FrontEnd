// src/pages/AdminDashboardPage.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../redux/slices/userSlice";
import { fetchAllProducts } from "../redux/slices/productSlice";
import { getAllOrders } from "../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states
  // 1. users
  const {
    allUsers,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);
  // 2. products
  const {
    items: allProducts,
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.products);
  // 3. orders
  const {
    allOrders,
    loading: orderLoading,
    error: orderError,
  } = useSelector((state) => state.orders);
  // The logged-in user
  const { userInfo } = useSelector((state) => state.user);

  // If your slices differ, adjust these property names accordingly.

  useEffect(() => {
    // Check if user is logged in and is an admin
    if (!userInfo) {
      navigate("/login");
      return;
    }
    if (userInfo.role !== "ADMIN") {
      // If not admin, redirect (or show an error)
      navigate("/");
      return;
    }

    // Dispatch actions to fetch all data
    dispatch(fetchAllUsers());
    dispatch(fetchAllProducts());
    dispatch(getAllOrders());
  }, [dispatch, userInfo, navigate]);

  // Compute summary stats
  const totalUsers = allUsers ? allUsers.length : 0;
  const totalProducts = allProducts ? allProducts.length : 0;
  const totalOrders = allOrders ? allOrders.length : 0;

  // Calculate total revenue, for example, summing each order's total
  let totalRevenue = 0;
  if (allOrders && allOrders.length > 0) {
    totalRevenue = allOrders.reduce(
      (sum, order) => sum + (order.total || 0),
      0
    );
  }

  // Show a small table of recent orders
  const recentOrders = (allOrders || []).slice(-5).reverse(); // last 5 orders

  // Loading/error checks
  const isLoading = userLoading || productLoading || orderLoading;
  const combinedError = userError || productError || orderError;

  if (isLoading) return <div>Loading admin data...</div>;
  if (combinedError) return <div>Error: {combinedError}</div>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="summary-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="card">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p>${totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="admin-links">
        <h3>Quick Actions</h3>
        <ul>
          <li>
            <a href="/admin/users">Manage Users</a>{" "}
            {/* or <Link to="/admin/users">... */}
          </li>
          <li>
            <a href="/admin/products">Manage Products</a>
          </li>
          <li>
            <a href="/admin/orders">Manage Orders</a>
          </li>
        </ul>
      </div>

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
            {recentOrders.map((order) => (
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
    </div>
  );
};

export default AdminDashboardPage;
