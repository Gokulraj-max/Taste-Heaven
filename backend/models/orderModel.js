const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  estimatedTime: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  cancelCharge: { type: Number, required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: "Pending" },
  paymentStatus: { type: String, enum: ["pending", "completed"], default: "pending" },
  feedback: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;



// const mongoose = require('mongoose');


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


// const orderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   name: { type: String, required: true }, // Order Name
//   estimatedTime: { type: String, required: true }, // Estimated Delivery Time
//   location: { type: String, required: true }, // Delivery Location
//   image: { type: String, required: true }, // Food Image
//   cancelCharge: { type: Number, required: true }, // Charge for cancellation
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
//   feedback: { type: String }, // Optional feedback field
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Order", orderSchema);