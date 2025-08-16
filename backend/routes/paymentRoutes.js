const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/PaymentController");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware for authentication

// Process payment
router.post("/payment", authMiddleware, PaymentController.processPayment);

module.exports = router;