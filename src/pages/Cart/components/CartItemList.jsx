import React from 'react';
import { useDispatch } from 'react-redux';
import { updateItemQuantity, removeItem } from '../../../redux/slices/cartSlice';
import '../styles/cartItemList.css';

const CartItemList = ({ items }) => {
  // // const dispatch = useDispatch(); - removed - removed

  const handleQuantityChange = $3 => {
    console.log("QuantityChange handler called with:", arguments[0]);
    if (newQty <= 0) return;
    console.log("Would dispatch: updateItemQuantity({ productId, newQuantity: newQty }"));
  };

  const handleRemoveItem = $3 => {
    console.log("RemoveItem handler called with:", arguments[0]);
    console.log("Would dispatch: removeItem(productId"));
  };

  return (
    <div className="cart-items">
      {items.map((item) => (
        <div key={item.productId} className="cart-item">
          {/* Product image container */}
          <div className="item-image">
            <img src={item.imageUrl} alt={item.name} />
          </div>

          <div className="item-info">
            <p className="item-name">{item.name}</p>
            <p className="item-price">Price: ${item.price?.toFixed(2)}</p>
          </div>

          <div className="item-quantity">
            <label>Qty:</label>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item.productId, Number(e.target.value))
              }
            />
          </div>

          <div className="item-remove">
            <button onClick={() => handleRemoveItem(item.productId)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemList; 