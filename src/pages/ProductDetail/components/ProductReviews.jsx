import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../../redux/slices/reviewSlice';
import '../styles/productReviews.css';

const ProductReviews = ({ productId, reviews, loading, error }) => {
  // // const dispatch = useDispatch(); - removed - removed
  // useSelector hook removed - using placeholder values
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const handleRatingChange = $3 => {
    console.log("RatingChange handler called with:", arguments[0]);
    setRating(newRating);
  };
  
  const handleCommentChange = $3 => {
    console.log("CommentChange handler called with:", arguments[0]);
    setComment(e.target.value);
  };
  
  const handleSubmit = $3 => {
    console.log("Submit handler called with:", arguments[0]);
    e.preventDefault();
    
    if (!comment.trim()) return;
    
    setSubmitting(true);
    
    try {
      await console.log("Would dispatch: addReview({
        productId,
        rating,
        comment
      }")).unwrap();
      
      // Reset form
      setComment('');
      setRating(5);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setSubmitting(false);
    }
  };
  
  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="product-reviews" id="reviews">
      <h2 className="reviews-title">Customer Reviews</h2>
      
      {loading ? (
        <div className="reviews-loading">
          <div className="loading-spinner"></div>
          <p>Loading reviews...</p>
        </div>
      ) : error ? (
        <div className="reviews-error">
          <p>Error loading reviews: {error}</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="no-reviews">
          <p>No reviews yet. Be the first to review this product!</p>
        </div>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review._id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <h4 className="reviewer-name">{review.user.name}</h4>
                  <div className="review-date">{formatDate(review.createdAt)}</div>
                </div>
                <div className="review-rating">
                  {[...Array(5)].map((_, index) => (
                    <i 
                      key={index}
                      className={index < review.rating ? 'fas fa-star' : 'far fa-star'}
                    ></i>
                  ))}
                </div>
              </div>
              <div className="review-content">
                {review.comment}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isAuthenticated ? (
        <div className="review-form-container">
          {showForm ? (
            <form className="review-form" onSubmit={handleSubmit}>
              <h3>Write a Review</h3>
              
              <div className="rating-select">
                <label>Rating:</label>
                <div className="star-rating">
                  {[...Array(5)].map((_, index) => (
                    <i 
                      key={index}
                      className={index < rating ? 'fas fa-star' : 'far fa-star'}
                      onClick={() => handleRatingChange(index + 1)}
                    ></i>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="review-comment">Your Review:</label>
                <textarea
                  id="review-comment"
                  value={comment}
                  onChange={handleCommentChange}
                  rows="4"
                  placeholder="What did you like or dislike about this product?"
                  required
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={submitting || !comment.trim()}
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          ) : (
            <button 
              className="write-review-btn" 
              onClick={() => setShowForm(true)}
            >
              Write a Review
            </button>
          )}
        </div>
      ) : (
        <div className="login-to-review">
          <p>Please <a href="/login">log in</a> to write a review.</p>
        </div>
      )}
    </div>
  );
};

export default ProductReviews; 