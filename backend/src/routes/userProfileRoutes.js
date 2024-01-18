// src/routes/userProfileRoutes.js
const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const authMiddleware = require('../middleware/authMiddleware');

// Authenticated route to get user profile
router.get('/profile', authMiddleware, userProfileController.getUserProfile);

// Authenticated route to update user profile
router.patch('/profile', authMiddleware, userProfileController.updateUserProfile);

module.exports = router;
