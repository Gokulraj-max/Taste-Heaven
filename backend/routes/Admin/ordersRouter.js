// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order'); // adjust path as necessary

// // GET /api/orders - retrieve all orders (populating the user field for name)
// router.get('/', async (req, res) => {
//   try {
//     const orders = await Order.find().populate('userId', 'name'); // populate user name only
//     res.json(orders);
//   } catch (error) {
//     console.error("Error retrieving orders:", error);
//     res.status(500).json({ message: 'Server error retrieving orders' });
//   }
// });


// module.exports = router;
