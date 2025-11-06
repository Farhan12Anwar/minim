const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // "Shirt", "Pants", "Shorts", etc.
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: String
});

module.exports = mongoose.model('Product', ProductSchema);
