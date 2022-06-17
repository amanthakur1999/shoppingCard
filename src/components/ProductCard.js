import React from 'react';

const ProductCard = ({ product, addedCartItems, addItemToCart, removeFromCart }) => {
  const alreadyAdded = addedCartItems.includes(product.id);

  return (
    <div key={product.id} className='product-outer-cont'>
      <div className="product-cont">
        <div className="product-img-cont" style={{backgroundImage: `url("/images/${product.filename}")`}} />
        <p>{product.title}</p>
        {Array(5).fill().map((_, index) => {
          if (product.rating < index + 1) {
            return <i className="fa-regular fa-star"></i>;
          }

          return <i className="fa-solid fa-star"></i>
        })}
        <p><i class="fa-solid fa-dollar-sign"></i> {product.price}</p>
        {
          alreadyAdded ? (
            <div className='row'>
              <button className='add-to-cart added-to-cart' disabled><i className="fa-regular fa-circle-check" /> {' '} Added to Cart</button> 
              <button className='remove-button' onClick={() => removeFromCart(product.id)}><i className="fa-solid fa-xmark"></i></button> 
            </div>
          ) : (
            <button className='add-to-cart' onClick={() => addItemToCart(product.id)}>Add to Cart</button> 
          )
        }
      </div>
    </div>
  )
}

export default ProductCard;
