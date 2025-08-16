
//weddingModel.js
const mongoose = require('mongoose');

const weddingBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  eventType: {
    type: String,
    required: true,
    enum: ['Traditional', 'Destination', 'Modern']
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
  cateringService: {
    type: String,
    required: true,
    enum: ['Yes', 'No']
  },
  decorationService: {
    type: String,
    required: true,
    enum: ['Yes', 'No']
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

const WeddingBooking = mongoose.model('WeddingBooking', weddingBookingSchema);
module.exports = WeddingBooking;