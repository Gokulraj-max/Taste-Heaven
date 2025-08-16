// backend/routes/ordersStats.js


//admin dashboard
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Ensure this path is correct
// You might also import other models if needed for registrations or visitors
// e.g., const User = require('../models/User');

router.get('/stats', async (req, res) => {
  try {
    // Example logic: replace these with your actual calculations
    const totalOrders = await Order.countDocuments();
    // For demonstration, we'll use static values for bounceRate, userRegistrations, and uniqueVisitors.
    // Replace these with your own logic/calculations.
    const bounceRate = 53;  
    const userRegistrations = 44;  
    const uniqueVisitors = 65;  

    res.json({
      totalOrders,
      bounceRate,
      userRegistrations,
      uniqueVisitors,
    });
  } catch (err) {
    console.error("Error fetching order stats:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

