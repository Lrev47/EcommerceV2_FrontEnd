import React, { useState } from 'react';
import '../styles/productActions.css';

const ProductActions = ({ product, quantity, onQuantityChange, onAddToCart }) => {
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(product?.colors ? product.colors[0] : null);
  
  // Placeholder states
  const isAuthenticated = true;
  const user = null;
  
  const handleQuantityChange = $3 => {
    console.log("QuantityChange handler called with:", arguments[0]);
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0 && newQuantity <= (product?.countInStock || 10)) {
      console.log('Quantity changed:', newQuantity);
      if (onQuantityChange) onQuantityChange(newQuantity);
    }
  };

  const increaseQuantity = () => {
    if (quantity < (product?.countInStock || 10)) {
      console.log('Increasing quantity to:', quantity + 1);
      if (onQuantityChange) onQuantityChange(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      console.log('Decreasing quantity to:', quantity - 1);
      if (onQuantityChange) onQuantityChange(quantity - 1);
    }
  };

  const handleAddToCart = $3 => {
    console.log("AddToCart handler called with:", arguments[0]);
    console.log('Adding to cart:', {
      product,
      quantity,
      size: selectedSize,
      color: selectedColor
    });
    
    if (onAddToCart) {
      onAddToCart({
        product,
        quantity,
        size: selectedSize,
        color: selectedColor
      });
    }
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleSizeChange = $3 => {
    console.log("SizeChange handler called with:", arguments[0]);
    console.log('Size selected:', size);
    setSelectedSize(size);
  };

  const handleColorChange = $3 => {
    console.log("ColorChange handler called with:", arguments[0]);
    console.log('Color selected:', color);
    setSelectedColor(color);
  };

  return (
    <div className="product-actions">
      {product?.discount > 0 && (
        <div className="product-discount">
          <span>-{product.discount}% OFF</span>
        </div>
      )}
      
      <div className="product-price">
        {product?.discount > 0 ? (
          <>
            <span className="original-price">${product?.price?.toFixed(2)}</span>
            <span className="discounted-price">
              ${(product?.price * (1 - product?.discount / 100)).toFixed(2)}
            </span>
          </>
        ) : (
          <span>${product?.price?.toFixed(2)}</span>
        )}
      </div>
      
      {product?.countInStock > 0 ? (
        <div className="in-stock">In Stock</div>
      ) : (
        <div className="out-of-stock">Out of Stock</div>
      )}
      
      {product?.sizes && product.sizes.length > 0 && (
        <div className="size-selector">
          <label>Size:</label>
          <div className="size-options">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {product?.colors && product.colors.length > 0 && (
        <div className="color-selector">
          <label>Color:</label>
          <div className="color-options">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="quantity-selector">
        <label>Quantity:</label>
        <div className="quantity-controls">
          <button onClick={decreaseQuantity} className="quantity-btn">-</button>
          <input
            type="number"
            min="1"
            max={product?.countInStock || 10}
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
          />
          <button onClick={increaseQuantity} className="quantity-btn">+</button>
        </div>
      </div>
      
      <button
        onClick={handleAddToCart}
        className={`add-to-cart-btn ${added ? 'added' : ''}`}
        disabled={!product?.countInStock}
      >
        {added ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductActions; 