// src/controllers/userProfileController.js
const User = require('../models/User');

const getUserProfile = async (req, res) => {
  try {
    // Retrieve user profile details excluding sensitive information
    const { _id, username, email } = req.user;
    res.status(200).json({ _id, username, email });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    // Update user profile details
    const { username, email } = req.body;

    // Ensure that the username or email is not already taken by other users
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ error: 'Username or email is already taken' });
    }

    // Update user profile
    req.user.username = username;
    req.user.email = email;

    await req.user.save();

    // Return the updated user profile details
    const { _id, username: updatedUsername, email: updatedEmail } = req.user;
    res.status(200).json({ _id, username: updatedUsername, email: updatedEmail });
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
