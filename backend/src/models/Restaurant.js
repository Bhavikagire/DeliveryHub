// src/models/Restaurant.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  phone: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: String,
      },
      comment: {
        type: String,
      },
      rating: {
        type: Number,
      },
    },
  ],
 
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
