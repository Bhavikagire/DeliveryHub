const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
