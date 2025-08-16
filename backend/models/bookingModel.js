const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  serviceType: { type: String, required: true },
  formData: { type: Object, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: 'confirmed' },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

