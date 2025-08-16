const express = require('express');
const router = express.Router();
const FamilyDiningBooking = require('../models/familyDiningModel');
const authenticate = require('../middleware/authMiddleware'); // Middleware for authentication

// Get available tables for a specific date and time
// router.get('/get-available-tables', async (req, res) => {
//   const { eventDate, eventTime } = req.query;

//   if (!eventDate || !eventTime) {
//     return res.status(400).json({ message: 'Event date and time are required' });
//   }

//   try {
//     const eventDateTime = new Date(`${eventDate}T${eventTime}`);

//     // Find all bookings for the selected date and time
//     const bookedTables = await FamilyDiningBooking.find({
//       eventDateTime,
//       status: { $in: ['Pending', 'Confirmed'] } // Only consider active bookings
//     }).select('diningTable');

//     // List of all tables in the restaurant
//     const allTables = ['Table A', 'Table B', 'Table C', 'Table D', 'Table E', 'Table F', 'Table G', 'Table H'];

//     // Check which tables are available
//     const availableTables = allTables.map(table => ({
//       name: table,
//       available: !bookedTables.some(booked => booked.diningTable === table)
//     }));

//     res.json({ tables: availableTables });
//   } catch (error) {
//     console.error('Error fetching available tables:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// Create a new booking
// router.post('/book', authenticate, async (req, res) => {
//   const { diningTable, eventDateTime, numberOfGuests, paymentMethod } = req.body;

//   // if (!diningTable || !eventDateTime || !numberOfGuests || !paymentMethod) {
//   //   return res.status(400).json({ message: 'All fields are required' });
//   // }

//   try {
//     const newBooking = new FamilyDiningBooking({
//       userId: req.user.id, // User ID from authentication middleware
//       diningTable,
//       eventDateTime: new Date(eventDateTime),
//       numberOfGuests,
//       paymentMethod
//     });

//     await newBooking.save();
//     res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// router.post('/book', authenticate, async (req, res) => {
//   try {
//       // Validate required fields
//       const { eventDateTime, diningTable, numberOfGuests } = req.body;
      
//       if (!eventDateTime || !diningTable || !numberOfGuests) {
//           return res.status(400).json({ error: "All fields are required" });
//       }

//       // Validate date format
//       const formattedDate = new Date(eventDateTime);
//       if (isNaN(formattedDate.getTime())) {
//           return res.status(400).json({ error: "Invalid date format" });
//       }

//       // Create a new booking
//       const newBooking = new FamilyDiningBooking({
//           eventDateTime: formattedDate,
//           diningTable,
//           numberOfGuests
//       });

//       await newBooking.save();
//       res.status(201).json({ message: "Booking successful", booking: newBooking });

//   } catch (error) {
//       console.error("Error creating booking:", error);
//       res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.post('/book', authenticate, async (req, res) => {
//   try {
//     const { diningTable, eventDateTime, numberOfGuests, paymentMethod } = req.body;

//     if (!diningTable || !eventDateTime || !numberOfGuests || !paymentMethod) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const newBooking = new FamilyDiningBooking({
//       userId: req.user.id, // User ID from authentication middleware
//       diningTable,
//       eventDateTime: new Date(eventDateTime),
//       numberOfGuests,
//       paymentMethod
//     });

//     await newBooking.save();
//     res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
router.post('/book', authenticate, async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body); // Debugging: Log the request body

    const { diningTable, eventDateTime, numberOfGuests, paymentMethod } = req.body;

    // Validate required fields
    if (!diningTable || !eventDateTime || !numberOfGuests || !paymentMethod) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate eventDateTime is a valid date
    const eventDate = new Date(eventDateTime);
    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Validate eventDateTime is a future date
    if (eventDate <= new Date()) {
      return res.status(400).json({ message: 'Event date must be in the future' });
    }

    // Validate numberOfGuests is a positive number
    if (typeof numberOfGuests !== 'number' || numberOfGuests < 1) {
      return res.status(400).json({ message: 'Number of guests must be a positive number' });
    }

    // Create a new booking with status set to "Pending"
    const newBooking = new FamilyDiningBooking({
      userId: req.user.id, // User ID from authentication middleware
      diningTable,
      eventDateTime: eventDate,
      numberOfGuests,
      paymentMethod,
      status: 'Pending', // Auto-set status to "Pending"
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});
router.put('/cancel/:id', authenticate, async (req, res) => {
  const { id } = req.params; // Booking ID from the URL
  const userId = req.user.id; // User ID from the authentication middleware

  try {
    // Find the booking by ID and ensure it belongs to the logged-in user
    const booking = await FamilyDiningBooking.findOne({ _id: id, userId });

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

router.get("/getBookings/:userId", authenticate, async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await FamilyDiningBooking.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching family dining bookings:", error);
    res.status(500).json({ message: "Failed to fetch family dining bookings" });
  }
});


module.exports = router;