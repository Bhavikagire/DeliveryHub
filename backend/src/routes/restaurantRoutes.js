// // src/routes/restaurantRoutes.js
// const express = require('express');
// const router = express.Router();
// const { getRestaurants, createRestaurant, getRestaurantById, addReviewToRestaurant } = require('../controllers/restaurantController');
// const authMiddleware = require('../middleware/authMiddleware');

// // Public routes
// router.get('/', getRestaurants);
// router.get('/:id', getRestaurantById);

// // Authenticated routes
// router.use(authMiddleware);
// router.post('/', createRestaurant);
// router.post('/:id/reviews', addReviewToRestaurant);

// module.exports = router;

// // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWEwMWQ1OGQxYzcxODYyNzI3MDYwMjYiLCJpYXQiOjE3MDQ5OTIxMDgsImV4cCI6MTcwNDk5NTcwOH0.TkvFdcz3coKjRg6-PI6t0SO6J8QL9oYKzIHTsgMP4g0
