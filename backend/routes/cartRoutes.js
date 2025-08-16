// // // backend/routes/cartRoutes.js
// const express = require('express');
// const { addToCart, getCartItems, removeFromCart } = require('../controllers/cartController');


// const authMiddleware = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/add', authMiddleware, addToCart);
// router.get('/', authMiddleware, getCartItems);
// router.delete('/remove/:id', authMiddleware, removeFromCart);

// module.exports = router;

const express = require("express");
const { addToCart, getCartItems, removeCartItem } = require("../controllers/cartController"); // ✅ Make sure you import correctly
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Ensure `addToCart`, `getCartItems`, and `removeCartItem` are imported and exist
router.post('/add', authMiddleware, addToCart);
router.get('/items', authMiddleware, getCartItems);
router.delete('/remove/:id', authMiddleware, removeCartItem);

module.exports = router;
