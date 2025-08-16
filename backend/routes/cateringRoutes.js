const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const CateringBooking = require('../models/cateringModel');

// POST /api/catering/book
// router.post('/book', authMiddleware, async (req, res) => {
//   const { formData, paymentMethod } = req.body;
//   const { eventType, guests, location, eventDate, eventTime } = formData;

//   // Check if all fields are provided
//   if (!eventType || !guests || !location || !paymentMethod || !eventDate || !eventTime) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   // Validate that eventDate is a valid date and in the future
//   const selectedDate = new Date(eventDate);
//   if (isNaN(selectedDate.getTime())) {
//     return res.status(400).json({ message: 'Invalid event date.' });
//   }

//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
//   if (selectedDate <= today) {
//     return res.status(400).json({ message: 'Please select a future date for the event.' });
//   }

//   // Combine eventDate and eventTime into one DateTime
//   let hour;
//   switch (eventTime.toLowerCase()) {
//     case 'morning': hour = 9; break;
//     case 'afternoon': hour = 13; break;
//     case 'evening': hour = 18; break;
//     case 'night': hour = 21; break;
//     default: hour = 9; // Default to morning if eventTime is invalid
//   }
//   const eventDateTime = new Date(eventDate);
//   eventDateTime.setHours(hour, 0, 0, 0); // Set the time based on eventTime

//   try {
//     // Create a new catering booking
//     const newBooking = new CateringBooking({
//       userId: req.user.id, // Assuming req.user is set from authMiddleware
//       eventType,
//       guests,
//       location,
//       paymentMethod,
//       eventDate: eventDateTime, // Save the combined eventDateTime
//       status: 'Pending', // Default status
//     });

//     // Save the booking to the database
//     await newBooking.save();

//     // Respond with success message and booking details
//     res.status(201).json({ 
//       message: 'Catering booking confirmed', 
//       booking: newBooking,
//     });
//   } catch (error) {
//     console.error('Error booking catering:', error);
//     res.status(500).json({ 
//       message: 'Error booking the catering service',
//       error: error.message, // Include error message for debugging
//     });
//   }
// });
router.post('/book', authMiddleware, async (req, res) => {
  const { eventType, guests, location, eventDate, eventTime, paymentMethod } = req.body;

  // Check if all fields are provided
  if (!eventType || !guests || !location || !paymentMethod || !eventDate || !eventTime) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validate that eventDate is a valid date and in the future
  const selectedDate = new Date(eventDate);
  if (isNaN(selectedDate.getTime())) {
    return res.status(400).json({ message: 'Invalid event date.' });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
  if (selectedDate <= today) {
    return res.status(400).json({ message: 'Please select a future date for the event.' });
  }

  // Combine eventDate and eventTime into one DateTime
  let hour;
  switch (eventTime.toLowerCase()) {
    case 'morning': hour = 9; break;
    case 'afternoon': hour = 13; break;
    case 'evening': hour = 18; break;
    case 'night': hour = 21; break;
    default: hour = 9; // Default to morning if eventTime is invalid
  }
  const eventDateTime = new Date(eventDate);
  eventDateTime.setHours(hour, 0, 0, 0); // Set the time based on eventTime

  try {
    // Create a new catering booking
    const newBooking = new CateringBooking({
      userId: req.user.id, // Assuming req.user is set from authMiddleware
      eventType,
      guests,
      location,
      paymentMethod,
      eventDate: eventDateTime, // Save the combined eventDateTime
      eventTime, // Include eventTime
      status: 'Pending', // Default status
    });

    // Save the booking to the database
    await newBooking.save();

    // Respond with success message and booking details
    res.status(201).json({ 
      message: 'Catering booking confirmed', 
      booking: newBooking,
    });
  } catch (error) {
    console.error('Error booking catering:', error);
    res.status(500).json({ 
      message: 'Error booking the catering service',
      error: error.message, // Include error message for debugging
    });
  }
});




// PUT /api/catering/cancel/:id
router.put('/cancel/:id', authMiddleware, async (req, res) => {
  const { id } = req.params; // Booking ID from the URL
  const userId = req.user.id; // User ID from the authMiddleware

  try {
    // Find the booking by ID and ensure it belongs to the logged-in user
    const booking = await CateringBooking.findOne({ _id: id, userId });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or you do not have permission to cancel this booking.' });
    }

    // Check if the booking is already cancelled
    if (booking.status === 'Cancelled') {
      return res.status(400).json({ message: 'This booking is already cancelled.' });
    }

    // Update the status to "Cancelled"
    booking.status = 'Cancelled';
    await booking.save();

    // Respond with success message and updated booking
    res.status(200).json({ 
      message: 'Booking cancelled successfully', 
      booking,
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ 
      message: 'Error cancelling the booking',
      error: error.message, // Include error message for debugging
    });
  }
});

router.get("/getBookings/:userId", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await CateringBooking.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching catering bookings:", error);
    res.status(500).json({ message: "Failed to fetch catering bookings" });
  }
});
module.exports = router;