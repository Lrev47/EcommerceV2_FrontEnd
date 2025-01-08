// src/pages/ProductListingPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // <-- import useParams
import { fetchAllProducts } from "../redux/slices/productSlice";
import ProductList from "../components/product/ProductList";

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  // Grab the category param from the URL, e.g. "/products/category/:category"
  const { category } = useParams();

  useEffect(() => {
    // If you haven't fetched all products yet, fetch them here
    // Or you can fetch them conditionally if needed
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (loading) {
    return <p className="loading-message">Loading...</p>;
  }
  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  // If there's a category in the URL, filter the items
  let filteredItems = items;
  if (category) {
    filteredItems = items.filter((product) => product.category === category);
  }

  return (
    <div className="product-listing-container">
      {/* If there's a category, show "Products in [Category]" else "All Products" */}
      <h1>{category ? `Products in ${category}` : "All Products"}</h1>

      {/* Pass the filtered list to your ProductList component */}
      <ProductList products={filteredItems} />
    </div>
  );
};

export default ProductListingPage;
