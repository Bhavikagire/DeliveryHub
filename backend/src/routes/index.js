// src/routes/index.js
const express = require('express');
const router = express.Router();
const { getRestaurants, createRestaurant, getRestaurantById, updateRestaurant, deleteRestaurant, addReviewToRestaurant} = require('../controllers/restaurantController');
const authMiddleware = require('../middleware/authMiddleware');

// Define routes
router.get('/restaurants', getRestaurants);

// router.use(authMiddleware);
router.post('/restaurants', createRestaurant);
router.get('/restaurants/:id', getRestaurantById); 
router.put('/restaurants/:id', updateRestaurant);
router.delete('/restaurants/:id', deleteRestaurant);
router.post('/restaurants/:id/reviews', addReviewToRestaurant); 


const cartController = require('../controllers/cartController');

router.post('/add', cartController.addItemToCart);
router.post('/remove', cartController.removeItemFromCart);
router.get('/view', cartController.viewCart);



module.exports = router;
