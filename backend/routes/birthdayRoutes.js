const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const BirthdayBooking = require('../models/birthdayModel');

// // POST /api/birthday/book
// router.post('/book', authMiddleware, async (req, res) => {
//   const { guests, cakeSize, cakeType, paymentMethod, eventDate } = req.body;

//   // Check if all fields are provided
//   if (!guests || !cakeSize || !cakeType || !paymentMethod || !eventDate) {
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

//   try {
//     // Create a new birthday booking
//     const newBooking = new BirthdayBooking({
//       userId: req.user.id, // Assuming req.user is set from authMiddleware
//       guests,
//       cakeSize,
//       cakeType,
//       paymentMethod,
//       eventDate: selectedDate, // Save the validated event date
//       status: 'Pending', // Default status
//     });

//     // Save the booking to the database
//     await newBooking.save();

//     // Respond with success message and booking details
//     res.status(201).json({ 
//       message: 'Birthday booking confirmed', 
//       booking: newBooking,
//     });
//   } catch (error) {
//     console.error('Error booking birthday:', error);
//     res.status(500).json({ 
//       message: 'Error booking the birthday event',
//       error: error.message, // Include error message for debugging
//     });
//   }
// });

// POST /api/birthday/book
router.post('/book', authMiddleware, async (req, res) => {
  const { guests, cakeSize, cakeType, paymentMethod, eventDate, eventTime } = req.body;

  // Check if all fields are provided
  if (!guests || !cakeSize || !cakeType || !paymentMethod || !eventDate || !eventTime) {
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
    // Create a new birthday booking
    const newBooking = new BirthdayBooking({
      userId: req.user.id, // Assuming req.user is set from authMiddleware
      guests,
      cakeSize,
      cakeType,
      paymentMethod,
      eventDate: eventDateTime, // Save the combined eventDateTime
      eventTime, // Save the eventTime separately
      status: 'Pending', // Default status
    });

    // Save the booking to the database
    await newBooking.save();

    // Respond with success message and booking details
    res.status(201).json({ 
      message: 'Birthday booking confirmed', 
      booking: newBooking,
    });
  } catch (error) {
    console.error('Error booking birthday:', error);
    res.status(500).json({ 
      message: 'Error booking the birthday event',
      error: error.message, // Include error message for debugging
    });
  }
});

// PUT /api/birthday/cancel/:id
router.put('/cancel/:id', authMiddleware, async (req, res) => {
  const { id } = req.params; // Booking ID from the URL
  const userId = req.user.id; // User ID from the authMiddleware

  try {
    // Find the booking by ID and ensure it belongs to the logged-in user
    const booking = await BirthdayBooking.findOne({ _id: id, userId });

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
    const bookings = await BirthdayBooking.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching birthday bookings:", error);
    res.status(500).json({ message: "Failed to fetch birthday bookings" });
  }
});

module.exports = router;





