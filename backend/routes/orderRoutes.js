
const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const User = require("../models/User");

// ✅ Place an Order
// router.post("/", async (req, res) => {  
//   try {
//     console.log("📥 Received Order Request:", req.body);
    
//     const { userId, name, estimatedTime, location, image, cancelCharge, items, totalAmount, paymentMethod, status } = req.body;

//     // Validation check
//     if (!userId || !name || !estimatedTime || !location || !image || !cancelCharge || !items.length || !totalAmount || !paymentMethod) {
//       return res.status(400).json({ message: "Missing required order details" });
//     }

//     // Create new order
//     const newOrder = new Order({
//       userId,
//       name,
//       estimatedTime,
//       location,
//       image,
//       cancelCharge,
//       items,
//       totalAmount,
//       paymentMethod,
//       status: status || "Pending",
//     });

//     const savedOrder = await newOrder.save();
//     res.status(201).json({ success: true, message: "✅ Order placed successfully", order: savedOrder });
//   } catch (error) {
//     console.error("❌ Error placing order:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });
// Route to place an order
router.post("/", async (req, res) => {
  try {
    const {
      user,
      name,
      estimatedTime,
      location,
      image,
      cancelCharge,
      items,
      totalAmount,
      paymentMethod,
      status,
      transactionId,
    } = req.body;

    // Validate required fields
    if (!user || !name || !estimatedTime || !location || !items || !totalAmount || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new order
    const newOrder = new Order({
      user,
      name,
      estimatedTime,
      location,
      image,
      cancelCharge,
      items,
      totalAmount,
      paymentMethod,
      status,
      transactionId,
    });

    // Save the order to the database
    await newOrder.save();

    // Respond with the created order
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
});




// ✅ Update Order Status
router.put("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    console.log(`🔄 Updating Order ID: ${orderId}, New Status: ${status}`);

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status;
    const updatedOrder = await order.save();
    res.json({ success: true, message: "✅ Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("❌ Error updating order:", error);
    res.status(500).json({ success: false, message: "Server error updating order" });
  }
});

//GET /api/orders - Retrieve all orders
router.get('/get/all', async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find().populate('user', 'name'); // Populate the user field with the user's name
    res.status(200).json(orders); // Send the orders as a JSON response
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});




// PUT /api/orders/:id - Update order status
router.put('/status/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Expecting { status: "some status" } in request body
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Server error updating order" });
  }
});

// Fetch count of orders
router.get("/count", async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.json({ success: true, count });
  } catch (error) {
    console.error("Error fetching order count:", error);
    res.status(500).json({ success: false, message: "Server error fetching order count" });
  }
});
module.exports = router;
