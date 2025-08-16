// utils/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();  // Ensure dotenv is used to load environment variables

// Create the transporter using SMTP (you can change the service if needed)
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Or use another service like 'smtp.ethereal.email'
  auth: {
    user: process.env.EMAIL,  // Your email address (stored in .env)
    pass: process.env.EMAIL_PASSWORD,  // Your email password (stored in .env)
  },
});

// Export the transporter to be used elsewhere
module.exports = transporter;
