import React from 'react';

const ProductMiniCard = ({ product, removeFromCart }) => {
  return (
    <div key={product.id} className="product-mini-outer-cont">
      <div className="product-mini-cont">
        <div
          className="product-mini-img-cont"
          style={{ backgroundImage: `url("/images/${product.filename}")` }}
        />
        <p>{product.title}</p>
        {Array(5)
          .fill()
          .map((_, index) => {
            if (product.rating < index + 1) {
              return <i className="fa-regular fa-star"></i>;
            }

            return <i className="fa-solid fa-star"></i>;
          })}
        <p>
          <i className="fa-solid fa-dollar-sign"></i> {product.price}
        </p>
        <button
          className="remove-from-cart"
          onClick={() => removeFromCart(product.id)}
        >
          <i className="fa-solid fa-xmark" />{' '}
        </button>
      </div>
    </div>
  );
};

export default ProductMiniCard;
