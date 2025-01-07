// src/pages/ProductDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/slices/productSlice";
import { addItem } from "../redux/slices/cartSlice";

const ProductDetailsPage = () => {
  const { id } = useParams(); // Grab the "id" from the URL /products/:id
  const dispatch = useDispatch();

  // From product slice
  const { singleProduct, loading, error } = useSelector(
    (state) => state.products
  );

  // For controlling quantity input, if you want the user to select how many
  const [quantity, setQuantity] = useState(1);

  // Fetch the product details when component mounts or "id" changes
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  // If you want to handle an "Add to Cart" flow
  const handleAddToCart = () => {
    if (!singleProduct) return;
    dispatch(
      addItem({
        productId: singleProduct.id,
        name: singleProduct.name,
        price: singleProduct.price,
        quantity,
        // any other relevant data (imageUrl, category, etc.)
      })
    );
  };

  // Render states
  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!singleProduct) return <div>Product not found.</div>;

  const {
    name,
    price,
    imageUrl,
    rating,
    description,
    inStock,
    quantity: stockQuantity,
  } = singleProduct;

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img
          src={imageUrl || "/placeholder.png"}
          alt={name}
          style={{ maxWidth: "300px" }}
        />
      </div>
      <div className="product-detail-info">
        <h2>{name}</h2>
        <p className="price">${price?.toFixed(2)}</p>
        {rating && <p>Rating: {rating} / 5</p>}
        <p>{description}</p>
        <p>In Stock: {inStock ? "Yes" : "No"}</p>
        {inStock && <p>Available Quantity: {stockQuantity}</p>}

        {/* Quantity selector (optional) */}
        {inStock && (
          <div className="add-to-cart-section">
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={stockQuantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        )}
      </div>

      {/* Link back to Product Listing, optional */}
      <div style={{ marginTop: "1rem" }}>
        <Link to="/products">Back to Products</Link>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
