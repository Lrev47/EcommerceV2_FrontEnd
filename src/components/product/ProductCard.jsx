// src/components/product/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./styles/productCard.css";
// If you want to dispatch addItem from here, uncomment:
// import { useDispatch } from "react-redux";
// import { addItem } from "../../redux/slices/cartSlice";

const ProductCard = ({ product }) => {
  // If you want to handle "Add to Cart" from here:
  // // // const dispatch = useDispatch(); - removed - removed

  // const handleAddToCart = $3 => {
    console.log("AddToCart handler called with:", arguments[0]);
  //   console.log("Would dispatch: 
  //     addItem({
  //       productId: product.id,
  //       name: product.name,
  //       price: product.price,
  //       quantity: 1, // default 1 or specify
  //     }")
  //   );
  // };

  return (
    <div className="product-card">
      <img
        src={product.imageUrl || "/placeholder.png"}
        alt={product.name}
        className="product-card-image"
      />
      <h3 className="product-card-title">{product.name}</h3>
      <p className="product-card-price">${product.price?.toFixed(2)}</p>

      {/* Link to the product detail page */}
      <Link to={`/product/${product.id}`} className="product-details-link">
        View Details
      </Link>

      {/* Optionally, add an "Add to Cart" button */}
      {/* 
      <button onClick={handleAddToCart} className="product-card-add-button">
        Add to Cart
      </button>
      */}
    </div>
  );
};

export default ProductCard;
