const express = require('express');
const router = express.Router();
const User = require("../models/User");

// Simulate async delay mechanism
const simulateDelay = (req, res, next) => {
  const delay = parseInt(req.query.delay) || 0;  // Delay passed as query parameter
  setTimeout(() => next(), delay);
};

// Get all users (admin only)
router.get('/users', simulateDelay, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Create a new user
router.post('/users', async (req, res) => {
  const { userId, password, role } = req.body;
  
  const user = new User({ userId, password, role });
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
