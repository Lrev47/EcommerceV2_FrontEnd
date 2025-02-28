import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/categorySection.css';

export const CategorySection = () => {
  // Define categories with their images and links
  const categories = [
    { id: 1, name: 'Electronics', image: '/Electronics.png' },
    { id: 2, name: 'Fitness', image: '/Fitness.png' },
    { id: 3, name: 'Bed and Bath', image: '/Bed and Bath.png' },
    { id: 4, name: 'Home & Office', image: '/Home and Office.png' },
    { id: 5, name: 'Health & Wellness', image: '/Health and Wellness.png' },
    { id: 6, name: 'Apparel', image: '/Apparel.png' }
  ];

  return (
    <section className="categories-section">
      <h2>Shop by Category</h2>
      <div className="categories-grid">
        {categories.map(category => (
          <Link 
            key={category.id}
            to={`/products/category/${encodeURIComponent(category.name)}`} 
            className="category-card"
          >
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}; 