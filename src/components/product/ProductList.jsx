// src/components/product/ProductList.jsx
import React from "react";
import ProductCard from "./ProductCard";
import "./styles/productList.css";

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="product-list">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList;
