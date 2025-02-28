import React from 'react';
import '../styles/testimonials.css';

export const Testimonials = () => {
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      text: "Absolutely love the selection here. Shipping was fast!",
      author: "Jane D."
    },
    {
      id: 2,
      text: "Great prices and amazing customer service!",
      author: "Austin S."
    },
    {
      id: 3,
      text: "Great selection, I signed up for the deals!",
      author: "Maria R."
    }
  ];

  return (
    <section className="testimonials-section">
      <h2>What Our Customers Say</h2>
      <div className="testimonials-grid">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="testimonial-card">
            <p>"{testimonial.text}"</p>
            <h4>- {testimonial.author}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}; 