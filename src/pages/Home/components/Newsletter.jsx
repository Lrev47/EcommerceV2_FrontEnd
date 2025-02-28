import React, { useState } from 'react';
import '../styles/newsletter.css';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubmit = $3 => {
    console.log("Submit handler called with:", arguments[0]);
    e.preventDefault();
    // Here you would typically call an API to subscribe the user
    // For now, we'll just simulate a successful subscription
    setSubscribed(true);
    setEmail('');
    
    // Reset the subscribed state after 5 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };
  
  return (
    <section className="newsletter-section">
      <h2>Stay in the Loop</h2>
      <p>Subscribe for the latest deals and updates!</p>
      
      {subscribed ? (
        <div className="subscription-success">
          Thanks for subscribing! You'll receive our newsletter soon.
        </div>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <button type="submit">Subscribe</button>
        </form>
      )}
    </section>
  );
}; 