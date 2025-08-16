//cateringModel.js 
const mongoose = require('mongoose');

const cateringBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  eventType: {
    type: String,
    required: true,
    enum: ['Wedding', 'Festival', 'Corporate Event']
  },
  guests: {
    type: Number,
    required: true,
    min: 1
  },
  location: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cash', 'Online']
  },
  eventTime: {
    type: String,
    required: true,
    enum: ['Morning', 'Afternoon', 'Evening', 'Night']
  },
  eventDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CateringBooking = mongoose.model('CateringBooking', cateringBookingSchema);
module.exports = CateringBooking;