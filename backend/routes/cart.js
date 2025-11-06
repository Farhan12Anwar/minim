// backend/routes/cart.js

const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();

// Helper: extract session or generate one (for demo: header or fallback to ip)
function getSessionId(req) {
  return req.headers['x-session-id'] || req.ip;
}

// Get current cart
router.get('/', async (req, res) => {
  const sessionId = getSessionId(req);
  const cart = await Cart.findOne({ sessionId }).populate('items.product');
  res.json({ cart: cart || { items: [] } });
});

// Add item to cart
router.post('/add', async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  if (!productId) return res.status(400).json({ error: 'Product id required' });
  const sessionId = getSessionId(req);

  let cart = await Cart.findOne({ sessionId });
  if (!cart) cart = new Cart({ sessionId, items: [] });

  // Check if this product is already in cart
  const idx = cart.items.findIndex(it => String(it.product) === String(productId));
  if (idx >= 0) {
    cart.items[idx].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  await cart.populate('items.product').execPopulate();

  res.json({ success: true, cart });
});

// Optionally, clear/reset cart (for demo/testing)
router.post('/clear', async (req, res) => {
  const sessionId = getSessionId(req);
  await Cart.deleteOne({ sessionId });
  res.json({ success: true });
});

// Optionally, remove item
router.post('/remove', async (req, res) => {
  const { productId } = req.body;
  const sessionId = getSessionId(req);
  const cart = await Cart.findOne({ sessionId });
  if (cart) {
    cart.items = cart.items.filter(
      it => String(it.product) !== String(productId)
    );
    await cart.save();
    await cart.populate('items.product').execPopulate();
  }
  res.json({ success: true, cart });
});

module.exports = router;
