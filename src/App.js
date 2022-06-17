import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckoutPage from './pages/Checkout';
import ProductList from './pages/ProductList';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/" element={<ProductList />} />
      </Routes>
    </Router>
  );
}
