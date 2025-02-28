import React from 'react';
import '../styles/summaryCard.css';

const SummaryCard = ({ title, value }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default SummaryCard; 