import React from 'react';

const OrderItemProduct = ({ item }) => {
  return (
    <li className="order-product">
      <div className="product-image">
        <img
          src={item.product?.imageUrl}
          alt={item.product?.name}
        />
      </div>
      <div className="product-info">
        <p className="product-name">
          {item.product?.name}
        </p>
        <p>
          Qty: {item.quantity} · ${item.price.toFixed(2)}
        </p>
      </div>
    </li>
  );
};

export default OrderItemProduct; 