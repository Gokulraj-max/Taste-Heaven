const mongoose = require('mongoose');

const serviceOrderSchema = new mongoose.Schema({
  serviceType: { type: String, required: true },
  formData: { type: Object, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: 'confirmed' },
  createdAt: { type: Date, default: Date.now },
});

const ServiceOrder = mongoose.model('ServiceOrder', serviceOrderSchema);

module.exports = ServiceOrder;
