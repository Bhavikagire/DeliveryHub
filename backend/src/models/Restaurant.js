const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String, // Assuming the image is stored as a URL
  },
  
});

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
  images: {
    type: String,
    required: true,
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
  menu: [menuSchema], // Include the menu as an array of menuSchema objects
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
