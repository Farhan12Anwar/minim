// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Models - Make sure these exist in /models
const Product = require('./models/Product');
const Contact = require('./models/Contact');
const Cart = require('./models/Cart');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',            // local dev
    'https://minim-th9h.onrender.com',  // your Render backend
    'https://minims.netlify.app/' // <-- replace with your deployed frontend URL
  ],
  credentials: true
}));

app.use(express.json()); // Use express.json instead of bodyParser

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {});

// ROUTES

// Products API
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get('/api/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// Contact message API
app.post('/api/contact', async (req, res) => {
  await Contact.create(req.body);
  res.json({ success: true });
});

// Helper: Session ID for cart, from header or IP
function getSessionId(req) {
  return req.headers['x-session-id'] || req.ip;
}

// Cart GET
app.get('/api/cart', async (req, res) => {
  const sessionId = getSessionId(req);
  const cart = await Cart.findOne({ sessionId }).populate('items.product');
  res.json({ cart: cart || { items: [] } });
});

// Cart ADD
app.post('/api/cart/add', async (req, res) => {
  try {
    console.log('DEBUG ADDCART req.body:', req.body);
    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ error: 'Product id required' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const sessionId = req.headers['x-session-id'] || req.ip;
    let cart = await Cart.findOne({ sessionId });
    if (!cart) cart = new Cart({ sessionId, items: [] });

    const idx = cart.items.findIndex(it => String(it.product) === String(productId));
    if (idx >= 0) {
      cart.items[idx].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    await cart.populate('items.product'); // <-- FIXED LINE

    res.json({ success: true, cart });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ error: err.message });
  }
});



// Cart REMOVE (optional)
app.post('/api/cart/remove', async (req, res) => {
  const { productId } = req.body;
  const sessionId = getSessionId(req);

  const cart = await Cart.findOne({ sessionId });
  if (cart) {
    cart.items = cart.items.filter(it => String(it.product) !== String(productId));
    await cart.save();
    await cart.populate('items.product');
  }
  res.json({ success: true, cart });
});

// Cart CLEAR (optional)
app.post('/api/cart/clear', async (req, res) => {
  const sessionId = getSessionId(req);
  await Cart.deleteOne({ sessionId });
  res.json({ success: true });
});

// Server listen
app.listen(5000, () => console.log('API server running on http://localhost:5000'));
