// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

console.log("going till token headers")
  if (!token) {
    
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    console.log("showing after try  here")
    console.log('Token Value:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("showing no decoded here")
    req.user = decoded;
    
    // Check user role for authorization
   
      next();
    
  } catch (error) {
    console.error('Error decoding token:', error.message);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
