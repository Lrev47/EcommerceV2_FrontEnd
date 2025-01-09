// src/pages/ProductDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/slices/productSlice";
import { addItem } from "../redux/slices/cartSlice";
import {
  fetchReviewsByProduct,
  createReview,
} from "../redux/slices/reviewSlice";
import StarRating from "../components/common/starRating"; // <== import the star rating component

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // From product slice
  const { singleProduct, loading, error } = useSelector(
    (state) => state.products
  );

  // From review slice
  const {
    items: reviews,
    loading: reviewLoading,
    error: reviewError,
  } = useSelector((state) => state.reviews);

  // Logged-in user info (for leaving reviews)
  const { userInfo } = useSelector((state) => state.user);

  // State for "Add to Cart" quantity
  const [quantity, setQuantity] = useState(1);

  // State for creating a new review
  const [starRating, setStarRating] = useState(5);
  const [comment, setComment] = useState("");

  // Fetch product + reviews when this page loads
  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchReviewsByProduct(id));
  }, [dispatch, id]);

  // Add product to cart
  const handleAddToCart = () => {
    if (!singleProduct) return;
    dispatch(
      addItem({
        productId: singleProduct.id,
        name: singleProduct.name,
        price: singleProduct.price,
        quantity,
        imageUrl: singleProduct.imageUrl,
      })
    );
  };

  // Submit a new review
  const handleCreateReview = (e) => {
    e.preventDefault();
    if (!userInfo) {
      alert("Please log in to leave a review.");
      return;
    }
    const reviewData = {
      userId: userInfo.id,
      productId: singleProduct.id,
      starRating,
      comment,
    };
    dispatch(createReview({ productId: singleProduct.id, reviewData })).then(
      () => {
        // Clear form
        setStarRating(5);
        setComment("");
      }
    );
  };

  // Loading/error states for product
  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!singleProduct) return <div>Product not found.</div>;

  // Destructure product info
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
    <div>
      {/* ========== TOP SECTION (Product Info) ========== */}
      <div className="product-detail-container">
        {/* Image */}
        <div className="product-detail-image">
          <img
            src={imageUrl || "/placeholder.png"}
            alt={name}
            className="product-image"
          />
        </div>

        {/* Info */}
        <div className="product-detail-info">
          <h2>{name}</h2>
          <p className="price">${price?.toFixed(2)}</p>

          {/* Render star rating if present */}
          {rating ? <StarRating rating={rating} /> : <p>No rating yet</p>}

          <p className="product-description">{description}</p>
          <p>In Stock: {inStock ? "Yes" : "No"}</p>
          {inStock && <p>Available Quantity: {stockQuantity}</p>}

          {/* Add to Cart */}
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
      </div>

      {/* Link to go back */}
      <div className="back-to-products">
        <Link to="/products">Back to Products</Link>
      </div>

      {/* ========== REVIEWS SECTION ========== */}
      <section className="reviews-section">
        <h3>Product Reviews</h3>
        {reviewLoading && <p>Loading reviews...</p>}
        {reviewError && <p>Error loading reviews: {reviewError}</p>}

        {reviews && reviews.length > 0 ? (
          <ul className="review-list">
            {reviews.map((rev) => {
              const user = rev.user;
              const username = user?.username || `User#${rev.userId}`;
              const userImage = user?.userImageUrl || "/default-profile.png";

              return (
                <li key={rev.id} className="review-item">
                  <div className="review-user">
                    <img
                      src={userImage}
                      alt={username}
                      className="review-user-image"
                    />
                    <div>
                      <p className="review-username">{username}</p>
                      {/* Display star rating for each review */}
                      <StarRating rating={rev.starRating} />
                    </div>
                  </div>
                  <div className="review-comment">
                    <p>{rev.comment}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}

        {/* If user is logged in, show the "leave a review" form */}
        {userInfo ? (
          <div className="review-form-wrapper">
            <h4>Leave a Review</h4>
            <form onSubmit={handleCreateReview} className="review-form">
              <label>
                Rating:
                <select
                  value={starRating}
                  onChange={(e) => setStarRating(Number(e.target.value))}
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Poor</option>
                  <option value={1}>1 - Terrible</option>
                </select>
              </label>
              <label>
                Comment:
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="3"
                  required
                />
              </label>
              <button type="submit">Submit Review</button>
            </form>
          </div>
        ) : (
          <p className="review-login-prompt">
            Please <Link to="/login">login</Link> to leave a review.
          </p>
        )}
      </section>
    </div>
  );
};

export default ProductDetailsPage;
