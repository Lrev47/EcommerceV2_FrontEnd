import React, { useEffect } from "react";
// Redux imports removed
import { fetchAllUsers } from "../../redux/slices/userSlice";
import { fetchAllProducts } from "../../redux/slices/productSlice";
import { getAllOrders } from "../../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import "./styles/adminDashboard.css";
import SummaryCard from "./components/SummaryCard";
import RecentOrdersTable from "./components/RecentOrdersTable";
import QuickActions from "./components/QuickActions";

const AdminDashboardPage = () => {
  // // const dispatch = useDispatch(); - removed - removed
  const navigate = useNavigate();

  // Redux states
  // 1. users
  // useSelector hook removed - using placeholder values
  // 2. products
  // useSelector hook removed - using placeholder values
  // 3. orders
  // useSelector hook removed - using placeholder values
  // The logged-in user
  // useSelector hook removed - using placeholder values

  // useEffect removed

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

  // Summary data for cards
  const summaryData = [
    { title: "Total Users", value: totalUsers },
    { title: "Total Products", value: totalProducts },
    { title: "Total Orders", value: totalOrders },
    { title: "Total Revenue", value: `$${totalRevenue.toFixed(2)}` }
  ];

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="summary-cards">
        {summaryData.map((card, index) => (
          <SummaryCard 
            key={index} 
            title={card.title} 
            value={card.value} 
          />
        ))}
      </div>

      <QuickActions />

      <RecentOrdersTable orders={recentOrders} />
    </div>
  );
};

export default AdminDashboardPage; 