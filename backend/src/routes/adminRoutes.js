// Example: src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Apply authMiddleware to restrict access to administrators
router.get('/admin-only', authMiddleware, (req, res) => {
  res.json({ message: 'This route is accessible only to administrators' });
});

module.exports = router;
