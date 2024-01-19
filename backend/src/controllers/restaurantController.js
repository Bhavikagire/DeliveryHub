// src/controllers/restaurantController.js
const Restaurant = require('../models/Restaurant');

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createRestaurant = async (req, res) => {
  try {
    const { name, cuisine, description, address,images, phone, website } = req.body;

    // Create a new restaurant
    const newRestaurant = new Restaurant({
      name,
      cuisine,
      description,
      address,
      images,
      phone,
      website,
    });

    // Save the restaurant to the database
    const savedRestaurant = await newRestaurant.save();

    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.error('Error creating restaurant:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// src/controllers/restaurantController.js
const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// src/controllers/restaurantController.js
const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cuisine, description, address,images, phone, website } = req.body;

    // Find the restaurant by ID and update its details
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      {
        name,
        cuisine,
        description,
        address,
        images,
        phone,
        website,
      },
      { new: true } // Return the updated restaurant
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(updatedRestaurant);
  } catch (error) {
    console.error('Error updating restaurant by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// src/controllers/restaurantController.js
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the restaurant by ID and delete it
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Error deleting restaurant by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// src/controllers/restaurantController.js
const addReviewToRestaurant = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const newReview = {
      user: req.user.username, // Associate the review with the authenticated user
      comment,
      rating,
    };

    restaurant.reviews.push(newReview);
    restaurant.rating = calculateAverageRating(restaurant.reviews);

    await restaurant.save();

    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Error adding review:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

module.exports = {
  getRestaurants,
  createRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  addReviewToRestaurant,
};


