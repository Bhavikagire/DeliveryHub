const Restaurant = require('../models/Restaurant');

const getRestaurants = async (req, res) => {
  try {
    const { searchQuery, cuisine, location, rating } = req.query;

    // Start with all restaurants
    let restaurants = await Restaurant.find();

    // Filter by search query
    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, 'i'); // Case-insensitive search
      restaurants = restaurants.filter(restaurant => searchRegex.test(restaurant.name));
    }

    // Filter by cuisine
    if (cuisine) {
      restaurants = restaurants.filter(restaurant => restaurant.cuisine === cuisine);
    }

    // Add more filters as needed (location, rating, etc.)

    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const createRestaurant = async (req, res) => {
  try {
    const { name, cuisine, description, address, images, phone, website, menu } = req.body;

    // Validate menu structure
    if (!Array.isArray(menu) || menu.some(item => typeof item !== 'object')) {
      return res.status(400).json({ error: 'Invalid menu structure' });
    }

    // Create a new restaurant
    const newRestaurant = new Restaurant({
      name,
      cuisine,
      description,
      address,
      images,
      phone,
      website,
      menu,
    });

    // Save the restaurant to the database
    const savedRestaurant = await newRestaurant.save();

    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.error('Error creating restaurant:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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

const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cuisine, description, address, images, phone, website, menu } = req.body;

    // Validate menu structure
    if (!Array.isArray(menu) || menu.some(item => typeof item !== 'object')) {
      return res.status(400).json({ error: 'Invalid menu structure' });
    }

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
        menu,
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
