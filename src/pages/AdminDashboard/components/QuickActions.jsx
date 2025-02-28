import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/quickActions.css';

const QuickActions = () => {
  const actions = [
    { label: 'Manage Users', path: '/admin/users' },
    { label: 'Manage Products', path: '/admin/products' },
    { label: 'Manage Orders', path: '/admin/orders' }
  ];

  return (
    <div className="admin-links">
      <h3>Quick Actions</h3>
      <ul>
        {actions.map((action, index) => (
          <li key={index}>
            <Link to={action.path}>{action.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickActions; 