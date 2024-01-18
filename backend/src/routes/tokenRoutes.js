// src/routes/tokenRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

// src/routes/tokenRoutes.js
router.post('/refresh', authMiddleware, (req, res) => {
  try {
    // Retrieve user details from the current token
    const { userId } = req.user;
    console.log('Decoded User ID:', userId);

    // Generate a new access token with expiration (1 hour)
    const newToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token: newToken });
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
