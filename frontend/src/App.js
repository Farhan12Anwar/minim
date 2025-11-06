import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import ContactPage from './components/ContactPage';
import './App.css';
import { CartProvider } from './components/CartContext';
import Cart from './components/CartPage';

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}
export default App;
