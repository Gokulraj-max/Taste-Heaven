const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const BirthdayBooking = require('../models/birthdayModel');
const CateringBooking = require('../models/cateringModel');
const FamilyDiningBooking = require('../models/familyDiningModel');
const WeddingBooking = require('../models/weddingModel');
const authMiddleware = require('../middleware/authMiddleware');

// Function to normalize event date and service type
function normalizeBooking(booking, serviceType) {
  let validEventDate = booking.eventDate ? new Date(booking.eventDate) : null;

  if (validEventDate && isNaN(validEventDate.getTime())) {
    console.warn(`⚠️ Invalid eventDate found in ${serviceType}:`, booking.eventDate);
    validEventDate = null; // Ensure invalid dates are set to null
  }

  const normalized = {
    _id: booking._id, // Use _id instead of id
    serviceType,
    serviceName: serviceType,
    eventDate: validEventDate || booking.eventDateTime, // Use eventDateTime for Family Dining
    title: `${serviceType} Booking`,
    cancelCharge: booking.cancelCharge || 0, // Include cancellation charge
    image: booking.image || "",
    numberOfGuests: booking.numberOfGuests || 0, // Ensure numberOfGuests is included
    diningTable: booking.diningTable,
    paymentMethod: booking.paymentMethod,
    status: booking.status || "Pending", // Include status field
  };

  return normalized;
}

// GET /api/getBookings/:userId
router.get('/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;
  console.log("📌 GET /api/getBookings called with userId:", userId);

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.warn("❌ Invalid userId format:", userId);
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const userIdQuery = new mongoose.Types.ObjectId(userId);

    // Fetch bookings for the user
    const [birthdayBookings, cateringBookings, familyBookings, weddingBookings] = await Promise.all([
      BirthdayBooking.find({ userId: userIdQuery }),
      CateringBooking.find({ userId: userIdQuery }),
      FamilyDiningBooking.find({ userId: userIdQuery }),
      WeddingBooking.find({ userId: userIdQuery }),
    ]);

    console.log("✅ Found bookings -> Birthday:", birthdayBookings.length, "Catering:", cateringBookings.length, "Family Dining:", familyBookings.length, "Wedding:", weddingBookings.length);

    // Normalize and combine bookings
    const allBookings = [
      ...birthdayBookings.map(b => normalizeBooking(b, "Birthday")),
      ...cateringBookings.map(b => normalizeBooking(b, "Catering")),
      ...familyBookings.map(b => normalizeBooking(b, "Family Dining")),
      ...weddingBookings.map(b => normalizeBooking(b, "Wedding")),
    ];

    // Sort by eventDate (handle null dates safely)
    allBookings.sort((a, b) => (a.eventDate?.getTime() || 0) - (b.eventDate?.getTime() || 0));

    console.log("📦 Backend Response:", allBookings);
    res.json(allBookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error.message);
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
});

// PUT /api/bookings/cancel/:serviceType/:id
// router.put("/cancel/:serviceType/:id", authMiddleware, async (req, res) => {
//   const { serviceType, id } = req.params;

//   try {
//     let booking;
//     switch (serviceType) {
//       case "birthday":
//         booking = await BirthdayBooking.findByIdAndUpdate(
//           id,
//           { status: "Cancelled", cancelCharge: 50 }, // Add cancellation fee
//           { new: true }
//         );
//         break;
//       case "catering":
//         booking = await CateringBooking.findByIdAndUpdate(
//           id,
//           { status: "Cancelled", cancelCharge: 50 }, // Add cancellation fee
//           { new: true }
//         );
//         break;
//       case "family":
//         booking = await FamilyDiningBooking.findByIdAndUpdate(
//           id,
//           { status: "Cancelled", cancelCharge: 50 }, // Add cancellation fee
//           { new: true }
//         );
//         break;
//       case "wedding":
//         booking = await WeddingBooking.findByIdAndUpdate(
//           id,
//           { status: "Cancelled", cancelCharge: 50 }, // Add cancellation fee
//           { new: true }
//         );
//         break;
//       default:
//         return res.status(400).json({ message: "Invalid service type" });
//     }

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.json({ success: true, message: "Booking cancelled successfully", booking });
//   } catch (error) {
//     console.error("Error cancelling booking:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


// router.put("/cancel/:serviceType/:id", async (req, res) => {
//   try {
//     const { serviceType, id } = req.params;

//     let booking;
//     switch (serviceType.toLowerCase()) {
//       case "birthday":
//         booking = await BirthdayBooking.findByIdAndUpdate(id, { status: "Cancelled" }, { new: true });
//         break;
//       case "catering":
//         booking = await CateringBooking.findByIdAndUpdate(id, { status: "Cancelled" }, { new: true });
//         break;
//       case "family":
//         booking = await FamilyDiningBooking.findByIdAndUpdate(
//           id,
//           { status: "Cancelled" },
//           { new: true }
//         );
//         break;
//       case "wedding":
//         booking = await WeddingBooking.findByIdAndUpdate(id, { status: "Cancelled" }, { new: true });
//         break;
//       default:
//         return res.status(400).json({ message: "Invalid service type" });
//     }

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.status(200).json({ success: true, message: "Booking cancelled successfully", booking });
//   } catch (error) {
//     console.error("Error cancelling booking:", error);
//     res.status(500).json({ message: "Failed to cancel booking", error: error.message });
//   }
// });
module.exports = router;




// const express = require('express');
// const mongoose = require('mongoose');
// const router = express.Router();

// const BirthdayBooking = require('../models/birthdayModel');
// const CateringBooking = require('../models/cateringModel');
// const FamilyDiningBooking = require('../models/familyDiningModel');
// const WeddingBooking = require('../models/weddingModel');
// const authMiddleware = require('../middleware/authMiddleware');

// // Function to normalize event date and service type
// function normalizeBooking(booking, serviceType) {
//   let validEventDate = booking.eventDate ? new Date(booking.eventDate) : null;

//   if (validEventDate && isNaN(validEventDate.getTime())) {
//     console.warn(`⚠️ Invalid eventDate found in ${serviceType}:`, booking.eventDate);
//     validEventDate = null; // Ensure invalid dates are set to null
//   }

//   const normalized = {
//     _id: booking._id, // Use _id instead of id
//     bookingType: serviceType, // Add bookingType
//     serviceName: serviceType,
//     eventDate: validEventDate || booking.eventDateTime, // Use eventDateTime for Family Dining
//     title: `${serviceType} Booking`,
//     cancelCharge: booking.cancelCharge || 0, // Include cancellation charge
//     image: booking.image || "",
//     numberOfGuests: booking.numberOfGuests || 0, // Ensure numberOfGuests is included
//     diningTable: booking.diningTable,
//     paymentMethod: booking.paymentMethod,
//     status: booking.status || "Pending", // Include status field
//     user: booking.userId, // Include the user details
//     guests: booking.guests,
//     cakeSize: booking.cakeSize,
//     cakeType: booking.cakeType,
//     eventType: booking.eventType,
//     location: booking.location,
//     cateringService: booking.cateringService,
//     decorationService: booking.decorationService,
//     createdAt: booking.createdAt,
//   };

//   return normalized;
// }

// // GET /api/bookings/all
// router.get('/all', async (req, res) => {
//   try {
//     // Fetch all bookings and populate user details
//     const [birthdayBookings, cateringBookings, familyBookings, weddingBookings] = await Promise.all([
//       BirthdayBooking.find().populate('userId', 'name','email'),
//       CateringBooking.find().populate('userId', 'name','email'),
//       FamilyDiningBooking.find().populate('userId','name','email'),
//       WeddingBooking.find().populate('userId', 'name','email'),
//     ]);

//     // Normalize and combine bookings
//     const allBookings = [
//       ...birthdayBookings.map(b => normalizeBooking(b, "Birthday")),
//       ...cateringBookings.map(b => normalizeBooking(b, "Catering")),
//       ...familyBookings.map(b => normalizeBooking(b, "Family Dining")),
//       ...weddingBookings.map(b => normalizeBooking(b, "Wedding")),
//     ];

//     // Sort by eventDate (handle null dates safely)
//     allBookings.sort((a, b) => (a.eventDate?.getTime() || 0) - (b.eventDate?.getTime() || 0));

//     res.json(allBookings);
//   } catch (error) {
//     console.error("❌ Error fetching bookings:", error.message);
//     res.status(500).json({ message: "Error fetching bookings", error: error.message });
//   }
// });

// module.exports = router;