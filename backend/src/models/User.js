// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'restaurant_owner', 'administrator'],
    default: 'user',
  },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password') || user.isNew) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
