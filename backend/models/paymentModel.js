const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["card", "upi"], // Allowed payment methods
    required: true,
  },
  productName: {
    type: String,
    required: true, // Product name
  },
  productImage: {
    type: String,
    required: true, // Product image URL
  },
  amount: {
    type: Number,
    required: true, // Payment amount
  },
  transactionId: {
    type: String,
    required: true,
    unique: true, // Ensure transaction IDs are unique
  },
  status: {
    type: String,
    enum: ["Pending", "Success", "Failed"], // Payment status
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);