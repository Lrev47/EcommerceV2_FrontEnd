// src/components/common/Footer.jsx
import React from "react";
import "./styles/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <p>© {currentYear} Mystical Marketplace. All rights reserved.</p>
      <ul className="footer-links">
        <li>
          <a href="/about">About Us</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/privacy">Privacy Policy</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
