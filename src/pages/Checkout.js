import React, { useEffect, useState } from 'react';
import products from '../data/products.json';

import '../css/base.css';
import '../css/products.css';
import '../css/checkout.css';
import ProductCard from '../components/ProductMiniCard';

const CheckoutPage = () => {
  const [addedProducts, setAddedProducts] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: '',
    number: '',
  });

  const getAddedCartItemsFromStorage = async () => {
    const addedItemsString = await localStorage.getItem('cartItems');
    const addedItems = addedItemsString ? JSON.parse(addedItemsString) : [];

    const addedProducts = addedItems.map((id) => {
      return products.find((product) => product.id === id);
    });

    setAddedProducts(addedProducts);
  };

  const removeFromCart = async (newItem) => {
    const filteredProducts = addedProducts.filter((item) => {
      return item.id !== newItem;
    });

    setAddedProducts(filteredProducts);

    const ids = filteredProducts.map((item) => item.id);

    await localStorage.setItem('cartItems', JSON.stringify(ids));
  };

  useEffect(() => {
    getAddedCartItemsFromStorage();
  }, []);

  const handleChange = (event) => {
    let { name, value } = event.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    // e.preventDefault();

    const usersString = await localStorage.getItem('user');
    const users = usersString ? JSON.parse(usersString) : [];

    const alreadyExist = users.find((user) => {
      return user.number === userDetails.number;
    });

    users.push(userDetails);

    await localStorage.setItem('user', JSON.stringify(users));
    console.log(userDetails);
  };

  return (
    <main className="main">
      <header className="header">
        <h1 className="header-title">Online Grocery Shopping Store</h1>
      </header>
      <section className="section">
        <form onSubmit={onSubmit} className="form-add">
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Customer Name"
            value={userDetails.name}
            onChange={handleChange}
          />
          <input
            className="input"
            type="number"
            name="number"
            placeholder="Phone number"
            value={userDetails.number}
            onChange={handleChange}
          />

          <button className="add-to-cart" type="submit">
            Submit
          </button>
        </form>
        <div className="products-cont">
          {addedProducts.map((product) => {
            return (
              <ProductCard
                product={product}
                key={product.id}
                removeFromCart={removeFromCart}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default CheckoutPage;
