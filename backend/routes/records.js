const express = require('express');
const router = express.Router();

// Dummy data for records
const records = [
  { id: 1, name: 'Record 1', role: 'General User' },
  { id: 2, name: 'Record 2', role: 'General User' },
  { id: 3, name: 'Admin Record 1', role: 'Admin' },
  { id: 4, name: 'Admin Record 2', role: 'Admin' },
];

// Fetch records based on the user's role
router.get('/', (req, res) => {
  const { role } = req.query;  // Role passed as a query parameter

  if (role === 'Admin') {
    // Admin can access all records
    const adminRecords = records.filter(record => record.role === 'Admin');
    res.json(adminRecords);
  } else {
    // General users can only access their own records
    const userRecords = records.filter(record => record.role === 'General User');
    res.json(userRecords);
  }
});

module.exports = router;
