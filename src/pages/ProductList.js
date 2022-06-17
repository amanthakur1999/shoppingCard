import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../data/products.json';

import '../css/base.css';
import '../css/products.css';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [addedCartItems, setAddCartItems] = useState([]);
  const navigate = useNavigate();

  const getAddedCartItemsFromStorage = async () => {
    const addedItemsString = await localStorage.getItem('cartItems');
    const addedItems = addedItemsString ? JSON.parse(addedItemsString) : [];

    setAddCartItems(addedItems);
  };

  const addItemToCart = async (newItem) => {
    setAddCartItems([...addedCartItems, newItem]);

    await localStorage.setItem(
      'cartItems',
      JSON.stringify([...addedCartItems, newItem])
    );
  };

  const removeFromCart = async (newItem) => {
    const filteredProducts = addedCartItems.filter((item) => {
      return item !== newItem;
    });

    setAddCartItems(filteredProducts);

    await localStorage.setItem('cartItems', JSON.stringify(filteredProducts));
  };

  useEffect(() => {
    getAddedCartItemsFromStorage();
  }, []);

  return (
    <main className="main">
      <header className="header">
        <h1 className="header-title">Online Grocery Shopping Store</h1>
        <button
          className="checkout-button"
          onClick={() => navigate('/checkout')}
        >
          Go To Checkout <i className="fa-solid fa-arrow-right"></i>
        </button>
      </header>
      <section className="section">
        <div className="row products-count">
          <p>{products.length} Products found</p>
          <p>{addedCartItems.length} Products added to Cart</p>
        </div>
        <div className="products-cont">
          {products.map((product) => {
            return (
              <ProductCard
                product={product}
                key={product.id}
                addedCartItems={addedCartItems}
                addItemToCart={addItemToCart}
                removeFromCart={removeFromCart}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default ProductList;
