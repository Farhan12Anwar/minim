const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  sessionId: String,
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);
