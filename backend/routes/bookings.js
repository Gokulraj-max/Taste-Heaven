// backend/routes/bookings.js
const express = require('express');
const router = express.Router();

// Import booking models (adjust paths and casing as necessary)
const BirthdayBooking = require('../models/birthdayModel');
const CateringBooking = require('../models/cateringModel');
const FamilyDiningBooking = require('../models/familyDiningModel');
const WeddingBooking = require('../models/weddingModel');

// GET /api/bookings/all - Aggregate all bookings
router.get('/all', async (req, res) => {
  try {
    // Fetch each booking type and populate the user details (name and email)
    const birthdayBookings = await BirthdayBooking.find()
      .populate('userId', 'name email')
      .lean();
    const cateringBookings = await CateringBooking.find()
      .populate('userId', 'name email')
      .lean();
    const familyDiningBookings = await FamilyDiningBooking.find()
      .populate('userId', 'name email')
      .lean();
    const weddingBookings = await WeddingBooking.find()
      .populate('userId', 'name email')
      .lean();

    // Tag each booking with a bookingType property for display and charting
    const allBookings = [
      ...birthdayBookings.map(booking => ({ ...booking, bookingType: 'Birthday' })),
      ...cateringBookings.map(booking => ({ ...booking, bookingType: 'Catering' })),
      ...familyDiningBookings.map(booking => ({ ...booking, bookingType: 'Family Dining' })),
      ...weddingBookings.map(booking => ({ ...booking, bookingType: 'Wedding' }))
    ];

    res.json(allBookings);
  } catch (error) {
    console.error('Error aggregating bookings:', error);
    res.status(500).json({ message: 'Server error aggregating bookings' });
  }
});



module.exports = router;
