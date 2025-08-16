//familyDiningModel.js

const mongoose = require('mongoose');

//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   diningTable: {
//     type: String,
//     required: true,
//   },
//   eventDateTime: {
//     type: Date,
//     required: true,
//     validate: {
//       validator: function (value) {
//         // Check if the date is in the future
//         return value > new Date();
//       },
//       message: 'eventDateTime must be a future date',
//     },
//   },
//   numberOfGuests: {
//     type: Number,
//     required: true,
//     min: 1,
//   },
//   paymentMethod: {
//     type: String,
//     required: true,
//     enum: ['Cash', 'Online'],
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Confirmed', 'Cancelled'],
//     default: 'Pending',
//   },
//   cancelCharge: {
//     type: Number,
//     default: 0,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });
const familyDiningBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  diningTable: {
    type: String,
    required: true,
  },
  eventDateTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        // Check if the date is in the future
        return value > new Date();
      },
      message: 'eventDateTime must be a future date',
    },
  },
  numberOfGuests: {
    type: Number,
    required: true,
    min: 1,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cash', 'Online'],
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending', // Default status is "Pending"
  },
  cancelCharge: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const FamilyDiningBooking = mongoose.model('FamilyDiningBooking', familyDiningBookingSchema);
module.exports = FamilyDiningBooking;

