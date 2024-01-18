// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    // Check user role for authorization
    if (decoded.role === 'administrator') {
      // Administrator has access to all routes
      next();
    } else {
      return res.status(403).json({ error: 'Forbidden' });
    }
  } catch (error) {
    console.error('Error decoding token:', error.message);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
