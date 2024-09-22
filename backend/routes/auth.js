const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login route
router.post('/login', async (req, res) => {
  const { userId, password } = req.body;
  
  try {
    const user = await User.findOne({ userId, password });
    
    if (user) {
      res.json({ userId: user.userId, role: user.role });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;
