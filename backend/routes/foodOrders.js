
// //user side order the food, cancel the order, get all orders

// const express = require("express");
// const router = express.Router();
// const { body, validationResult } = require("express-validator");
// const Order = require("../models/orderModel");
// const mongoose = require('mongoose');

// const authMiddleware = require("../middleware/authMiddleware"); // Import middleware

// // ✅ Create a new food order
// router.post(
//   "/create",
//   [
//     body("userId").notEmpty().withMessage("User ID is required"),
//     body("name").notEmpty().withMessage("Name is required"),
//     body("estimatedTime").notEmpty().withMessage("Estimated time is required"),
//     body("location").notEmpty().withMessage("Location is required"),
//     body("items").isArray({ min: 1 }).withMessage("Items must be an array and cannot be empty"),
//     body("totalAmount").isFloat({ min: 1 }).withMessage("Total amount must be a valid number"),
//     body("paymentMethod").notEmpty().withMessage("Payment method is required"),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ success: false, errors: errors.array() });
//       }

//       const { userId, name, estimatedTime, location, image, cancelCharge = 10, items, totalAmount, paymentMethod, status } = req.body;

//       const newOrder = new Order({
//         userId,
//         name,
//         estimatedTime,
//         location,
//         image,
//         cancelCharge,
//         items,
//         totalAmount,
//         paymentMethod,
//         status: status || "Pending",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       });

//       const savedOrder = await newOrder.save();
//       res.status(201).json({ success: true, message: "Order created successfully!", order: savedOrder });
//     } catch (error) {
//       console.error("❌ Error creating order:", error);
//       res.status(500).json({ success: false, message: "Failed to create order.", error: error.message });
//     }
//   }
// );

// // ✅ Get all food orders for a specific user


// // ✅ Get all food orders for a specific user (Protected Route)
// // router.get("/", authMiddleware, async (req, res) => {
// //   try {
// //     const userId = req.user.id; // Extracted from the token
// //     const orders = await Order.find({ userId }).sort({ createdAt: -1 });

// //     if (orders.length === 0) {
// //       return res.status(200).json({ success: true, message: "No orders found.", orders: [] });
// //     }

// //     res.status(200).json({ success: true, message: "Orders fetched successfully!", orders });
// //   } catch (error) {
// //     console.error("❌ Error fetching orders:", error);
// //     res.status(500).json({ success: false, message: "Failed to fetch orders.", error: error.message });
// //   }
// // });

// // ✅ Get all food orders for the current user (Protected Route)

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Renamed to 'user'
//   name: { type: String, required: true },
//   estimatedTime: { type: String, required: true },
//   location: { type: String, required: true },
//   image: { type: String, required: true },
//   cancelCharge: { type: Number, required: true },
//   items: [
//     {
//       name: { type: String, required: true },
//       quantity: { type: Number, required: true },
//       price: { type: Number, required: true },
//     }
//   ],
//   totalAmount: { type: Number, required: true },
//   paymentMethod: { type: String, required: true },
//   status: { type: String, default: "Pending" },
//   paymentStatus: { type: String, enum: ["pending", "completed"], default: "pending" },
//   feedback: { type: String },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Order", orderSchema);

// // ✅ Cancel an order with ₹50 penalty
// router.put("/cancel/:orderId", async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found." });
//     }

//     if (order.status === "Canceled") {
//       return res.status(400).json({ success: false, message: "Order is already canceled." });
//     }

//     if (order.status === "Completed") {
//       return res.status(400).json({ success: false, message: "Completed orders cannot be canceled." });
//     }

//     let updatedAmount = order.totalAmount;
//     if (updatedAmount > 0) {
//       updatedAmount = Math.max(updatedAmount - order.cancelCharge, 0);
//     }

//     order.status = "Canceled";
//     order.totalAmount = updatedAmount;
//     order.updatedAt = new Date();
//     await order.save();

//     res.status(200).json({ success: true, message: "Order canceled successfully!", updatedOrder: order });
//   } catch (error) {
//     console.error("❌ Error canceling order:", error);
//     res.status(500).json({ success: false, message: "Failed to cancel order.", error: error.message });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Order = require("../models/orderModel"); // Import the Order model
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Create a new food order
router.post(
  "/create",
  [
    body("userId").notEmpty().withMessage("User ID is required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("estimatedTime").notEmpty().withMessage("Estimated time is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("items").isArray({ min: 1 }).withMessage("Items must be an array and cannot be empty"),
    body("totalAmount").isFloat({ min: 1 }).withMessage("Total amount must be a valid number"),
    body("paymentMethod").notEmpty().withMessage("Payment method is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { userId, name, estimatedTime, location, image, cancelCharge = 10, items, totalAmount, paymentMethod, status } = req.body;

      const newOrder = new Order({
        userId,
        name,
        estimatedTime,
        location,
        image,
        cancelCharge,
        items,
        totalAmount,
        paymentMethod,
        status: status || "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const savedOrder = await newOrder.save();
      res.status(201).json({ success: true, message: "Order created successfully!", order: savedOrder });
    } catch (error) {
      console.error("❌ Error creating order:", error);
      res.status(500).json({ success: false, message: "Failed to create order.", error: error.message });
    }
  }
);

// ✅ Get all food orders for the current user (Protected Route)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the token
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(200).json({ success: true, message: "No orders found.", orders: [] });
    }

    res.status(200).json({ success: true, message: "Orders fetched successfully!", orders });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders.", error: error.message });
  }
});

// ✅ Cancel an order with ₹50 penalty
router.put("/cancel/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    if (order.status === "Canceled") {
      return res.status(400).json({ success: false, message: "Order is already canceled." });
    }

    if (order.status === "Completed") {
      return res.status(400).json({ success: false, message: "Completed orders cannot be canceled." });
    }

    let updatedAmount = order.totalAmount;
    if (updatedAmount > 0) {
      updatedAmount = Math.max(updatedAmount - order.cancelCharge, 0);
    }

    order.status = "Canceled";
    order.totalAmount = updatedAmount;
    order.updatedAt = new Date();
    await order.save();

    res.status(200).json({ success: true, message: "Order canceled successfully!", updatedOrder: order });
  } catch (error) {
    console.error("❌ Error canceling order:", error);
    res.status(500).json({ success: false, message: "Failed to cancel order.", error: error.message });
  }
});

module.exports = router;