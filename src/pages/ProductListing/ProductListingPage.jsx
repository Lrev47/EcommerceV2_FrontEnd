import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllProducts } from "../../redux/slices/productSlice";
import ProductFilter from "./components/ProductFilter";
import ProductGrid from "./components/ProductGrid";
import "./styles/productListing.css";

const ProductListingPage = () => {
  // // const dispatch = useDispatch(); - removed - removed
  // useSelector hook removed - using placeholder values
  const { category } = useParams();

  // useEffect removed

  // Ensure items is an array before filtering
  const itemsArray = Array.isArray(items) ? items : [];

  // If there's a category in the URL, filter the items
  let filteredItems = itemsArray;
  if (category) {
    filteredItems = itemsArray.filter((product) => product.category === category);
  }

  return (
    <div className="product-listing-page">
      <div className="product-listing-header">
        <h1 className="product-listing-title">
          {category ? `${category}` : "All Products"}
        </h1>
        <p className="product-count">
          {filteredItems.length} {filteredItems.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      <div className="product-listing-container">
        <aside className="product-filters-sidebar">
          <ProductFilter />
        </aside>
        
        <main className="product-grid-container">
          {loading ? (
            <div className="product-listing-loading">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <div className="product-listing-error">
              <h2>Error</h2>
              <p>{error}</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="no-products-found">
              <h2>No Products Found</h2>
              <p>We couldn't find any products {category ? `in ${category}` : ""}</p>
            </div>
          ) : (
            <ProductGrid products={filteredItems} />
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductListingPage; 