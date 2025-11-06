import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

function getLocalSession() {
  let sid = localStorage.getItem('sessionId');
  if (!sid) {
    sid = Math.random().toString(36).slice(2);
    localStorage.setItem('sessionId', sid);
  }
  return sid;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    const sessionId = getLocalSession();
    axios.get('/api/cart', { headers: { 'x-session-id': sessionId } })
      .then(res => setCart(res.data.cart));
  }, []);

  // Add to cart with backend call
  function addToCart(product) {
    const sessionId = getLocalSession();
    return axios.post('/api/cart/add',
      { productId: product._id, quantity: 1 }, { headers: { 'x-session-id': sessionId } }
    ).then(res => {
      setCart(res.data.cart);
    });
  }

  // REMOVE FROM CART FUNCTION
  function removeFromCart(productId) {
    const sessionId = getLocalSession();
    return axios.post('/api/cart/remove', { productId }, { headers: { 'x-session-id': sessionId } })
      .then(res => setCart(res.data.cart));
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
