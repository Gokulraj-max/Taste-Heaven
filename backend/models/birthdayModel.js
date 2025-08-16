//birthdayModel.js
const mongoose = require('mongoose');

const birthdayBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  guests: {
    type: Number,
    required: true,
    min: 1
  },
  cakeSize: {
    type: Number,
    required: true,
    min: 0
  },
  cakeType: {
    type: String,
    required: true,
    enum: ['Chocolate', 'Vanilla', 'Strawberry']
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cash', 'Online']
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventTime: {
    type: String,
    required: true,
    enum: ['Morning', 'Afternoon', 'Evening', 'Night']
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

const BirthdayBooking = mongoose.model('BirthdayBooking', birthdayBookingSchema);
module.exports = BirthdayBooking;