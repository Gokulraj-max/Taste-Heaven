// const express = require("express");
// const Order = require("../models/order");
// const BirthdayBooking = require("../models/birthdayBooking");
// const CateringBooking = require("../models/cateringBooking");
// const FamilyDiningBooking = require("../models/familyDiningBooking");
// const WeddingBooking = require("../models/weddingBooking");
// const router = express.Router();

// // Get monthly revenue
// router.get("/revenue/monthly", async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//     const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

//     // Fetch total order revenue
//     const orderRevenue = await Order.aggregate([
//       { $match: { createdAt: { $gte: startOfMonth, $lte: endOfMonth } } },
//       { $group: { _id: null, total: { $sum: "$totalAmount" } } }
//     ]);

//     // Fetch total revenue from different bookings
//     const birthdayRevenue = await BirthdayBooking.countDocuments({ eventDate: { $gte: startOfMonth, $lte: endOfMonth } });
//     const cateringRevenue = await CateringBooking.countDocuments({ eventDate: { $gte: startOfMonth, $lte: endOfMonth } });
//     const weddingRevenue = await WeddingBooking.countDocuments({ eventDate: { $gte: startOfMonth, $lte: endOfMonth } });
//     const familyDiningRevenue = await FamilyDiningBooking.countDocuments({ eventDateTime: { $gte: startOfMonth, $lte: endOfMonth } });

//     // Summing all revenue
//     const totalRevenue = (orderRevenue[0]?.total || 0) + (birthdayRevenue * 500) + (cateringRevenue * 1000) + (weddingRevenue * 2000) + (familyDiningRevenue * 300);

//     res.json({
//       month: currentDate.toLocaleString('default', { month: 'long' }),
//       orderRevenue: orderRevenue[0]?.total || 0,
//       bookingRevenue: {
//         birthday: birthdayRevenue * 500,
//         catering: cateringRevenue * 1000,
//         wedding: weddingRevenue * 2000,
//         familyDining: familyDiningRevenue * 300
//       },
//       totalRevenue
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching monthly revenue", error });
//   }
// });

// module.exports = router;
const express = require("express");
const Order = require("../models/orderModel"); 
const BirthdayBooking = require("../models/birthdayModel");
const CateringBooking = require("../models/cateringModel");
const FamilyDiningBooking = require("../models/familyDiningModel");
const WeddingBooking = require("../models/weddingModel");

const router = express.Router();

// Get Monthly Revenue
router.get("/monthly-revenue", async (req, res) => {
  try {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Get total revenue from orders
    const ordersRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
          paymentStatus: "completed", 
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    // Get total revenue from bookings
    const birthdayRevenue = await BirthdayBooking.aggregate([
      {
        $match: { createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } },
      },
      { $group: { _id: null, total: { $sum: "$cakeSize" } } }, // Assume cakeSize represents payment for birthday bookings
    ]);

    const cateringRevenue = await CateringBooking.aggregate([
      {
        $match: { createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } },
      },
      { $group: { _id: null, total: { $sum: "$guests" } } }, // Assume guests represent the payment
    ]);

    const weddingRevenue = await WeddingBooking.aggregate([
      {
        $match: { createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } },
      },
      { $group: { _id: null, total: { $sum: "$guests" } } }, // Assume guests represent the payment
    ]);

    // Sum up total revenue
    const totalOrdersRevenue = ordersRevenue.length > 0 ? ordersRevenue[0].total : 0;
    const totalBirthdayRevenue = birthdayRevenue.length > 0 ? birthdayRevenue[0].total : 0;
    const totalCateringRevenue = cateringRevenue.length > 0 ? cateringRevenue[0].total : 0;
    const totalWeddingRevenue = weddingRevenue.length > 0 ? weddingRevenue[0].total : 0;

    const totalRevenue = totalOrdersRevenue + totalBirthdayRevenue + totalCateringRevenue + totalWeddingRevenue;

    res.json({
      totalOrdersRevenue,
      totalBookingsRevenue: totalBirthdayRevenue + totalCateringRevenue + totalWeddingRevenue,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;

