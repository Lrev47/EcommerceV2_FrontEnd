// src/pages/UserOrdersPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUser } from "../redux/slices/orderSlice";
import { useNavigate, Link } from "react-router-dom";
import "../styles/pages/UserOrdersPage.css";

const UserOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const { userOrders, loading, error } = useSelector((state) => state.orders);

  // State for expanded orders, filter, and search
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(getOrdersByUser(userInfo.id));
    }
  }, [userInfo, dispatch, navigate]);

  // Toggle function for expand/collapse
  const toggleExpand = (orderId) => {
    setExpandedOrders((prevExpanded) => {
      if (prevExpanded.includes(orderId)) {
        return prevExpanded.filter((id) => id !== orderId);
      } else {
        return [...prevExpanded, orderId];
      }
    });
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "status-pending";
      case "processing":
        return "status-processing";
      case "shipped":
        return "status-shipped";
      case "delivered":
        return "status-delivered";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  // Format date nicely
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter orders based on selected filter and search query
  const filteredOrders = userOrders
    .filter(order => {
      if (filterStatus === "all") return true;
      return order.status.toLowerCase() === filterStatus.toLowerCase();
    })
    .filter(order => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        order.id.toString().includes(query) ||
        order.status.toLowerCase().includes(query) ||
        (order.orderItems && order.orderItems.some(item => 
          item.product && item.product.name.toLowerCase().includes(query)
        ))
      );
    });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!userInfo) {
    return null;
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <h1 className="orders-title">My Orders</h1>
          <p className="orders-subtitle">Track and manage your order history</p>
        </div>

        <div className="orders-layout">
          <aside className="account-sidebar">
            <div className="sidebar-content">
              <div className="user-info">
                <div className="user-avatar-placeholder">
                  {userInfo.firstName ? userInfo.firstName.charAt(0).toUpperCase() : "U"}
                  {userInfo.lastName ? userInfo.lastName.charAt(0).toUpperCase() : ""}
                </div>
                <h3 className="user-name">
                  {userInfo.firstName} {userInfo.lastName}
                </h3>
                <p className="user-email">{userInfo.email}</p>
              </div>
              
              <nav className="account-nav">
                <Link to="/account" className="nav-link">
                  <i className="fas fa-user nav-icon"></i>
                  Profile Information
                </Link>
                <Link to="/account" className="nav-link">
                  <i className="fas fa-map-marker-alt nav-icon"></i>
                  Address Book
                </Link>
                <Link to="/account" className="nav-link">
                  <i className="fas fa-lock nav-icon"></i>
                  Change Password
                </Link>
                <Link to="/orders" className="nav-link active">
                  <i className="fas fa-shopping-bag nav-icon"></i>
                  Order History
                </Link>
                <button onClick={() => {
                  // Handle logout
                  navigate("/login");
                }} className="logout-button">
                  <i className="fas fa-sign-out-alt nav-icon"></i>
                  Logout
                </button>
              </nav>
            </div>
          </aside>

          <main className="orders-content">
            <div className="content-header">
              <h2 className="content-title">Order History</h2>
            </div>

            {loading ? (
              <div className="orders-loading">
                <div className="loading-spinner"></div>
                <p>Loading your orders...</p>
              </div>
            ) : error ? (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                <span>Error loading orders: {error}</span>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="empty-orders">
                <i className="fas fa-shopping-bag"></i>
                <h3 className="empty-orders-title">No orders found</h3>
                {searchQuery || filterStatus !== "all" ? (
                  <p className="empty-orders-message">Try changing your search or filter criteria</p>
                ) : (
                  <p className="empty-orders-message">You haven't placed any orders yet.</p>
                )}
                <Link to="/products" className="shop-now-button">Start Shopping</Link>
              </div>
            ) : (
              <>
                <div className="order-filters">
                  <div className="filter-group">
                    <label htmlFor="status-filter" className="filter-label">Status:</label>
                    <select 
                      id="status-filter" 
                      className="filter-select"
                      value={filterStatus}
                      onChange={(e) => {
                        setFilterStatus(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="all">All Orders</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="search-container">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                </div>

                <div className="orders-list">
                  {currentOrders.map((order) => {
                    const isExpanded = expandedOrders.includes(order.id);
                    return (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <div className="order-info">
                            <span className="order-label">Order ID</span>
                            <span className="order-value">{order.id}</span>
                          </div>
                          <div className="order-info">
                            <span className="order-label">Date</span>
                            <span className="order-value">{formatDate(order.createdAt)}</span>
                          </div>
                          <div className="order-info">
                            <span className="order-label">Total</span>
                            <span className="order-value">${order.total.toFixed(2)}</span>
                          </div>
                          <div className="order-info">
                            <span className="order-label">Status</span>
                            <span className={`order-status ${getStatusBadgeClass(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>

                        <div className={`order-body ${isExpanded ? 'expanded' : ''}`}>
                          {isExpanded && order.orderItems && order.orderItems.length > 0 && (
                            <div className="order-items">
                              {order.orderItems.map((item) => (
                                <div key={item.id} className="order-item">
                                  <img 
                                    src={item.product?.imageUrl || "/images/placeholder.png"} 
                                    alt={item.product?.name} 
                                    className="order-item-image"
                                  />
                                  <div className="order-item-details">
                                    <Link to={`/product/${item.product?.id}`} className="order-item-name">
                                      {item.product?.name}
                                    </Link>
                                    {item.variant && (
                                      <div className="order-item-variant">
                                        {item.variant}
                                      </div>
                                    )}
                                    <div className="order-item-info">
                                      <span className="order-item-price">${item.price.toFixed(2)}</span>
                                      <span className="order-item-quantity">× {item.quantity}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {isExpanded && (
                            <div className="order-summary">
                              <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${(order.total - (order.shippingCost || 0)).toFixed(2)}</span>
                              </div>
                              <div className="summary-row">
                                <span>Shipping</span>
                                <span>${(order.shippingCost || 0).toFixed(2)}</span>
                              </div>
                              <div className="summary-row total">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="order-footer">
                          <button 
                            className="expand-btn" 
                            onClick={() => toggleExpand(order.id)}
                            aria-label={isExpanded ? "Collapse order details" : "Expand order details"}
                          >
                            {isExpanded ? (
                              <>View less <i className="fas fa-chevron-up"></i></>
                            ) : (
                              <>View details <i className="fas fa-chevron-down"></i></>
                            )}
                          </button>

                          <div className="order-actions">
                            {order.status === "shipped" && (
                              <button className="order-action track-order-btn">
                                <i className="fas fa-truck"></i> Track Order
                              </button>
                            )}
                            {(order.status === "pending" || order.status === "processing") && (
                              <button className="order-action cancel-order-btn">
                                <i className="fas fa-times"></i> Cancel Order
                              </button>
                            )}
                            <Link to={`/order/${order.id}`} className="order-action view-details-btn">
                              <i className="fas fa-file-alt"></i> Order Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="pagination">
                    <button 
                      className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
                      onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button 
                      className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
                      onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserOrdersPage;
