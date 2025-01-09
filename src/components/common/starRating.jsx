// src/pages/components/StarRating.jsx
import React from "react";

const StarRating = ({ rating }) => {
  // Ensure rating is in [0, 5]
  const clamped = Math.min(Math.max(rating, 0), 5);
  const fullStars = Math.floor(clamped); // Number of full stars
  const emptyStars = 5 - fullStars; // Number of empty stars

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="star full">
          ★
        </span>
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="star empty">
          ★
        </span>
      ))}
      <span className="rating-number">({clamped.toFixed(1)})</span>
    </div>
  );
};

export default StarRating;
