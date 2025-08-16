const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require("nodemailer");

// Importing routes
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const offerRoutes = require('./routes/offers');
const productsRoute = require('./routes/products');
const birthdayRoutes = require('./routes/birthdayRoutes');
const orderRoutes = require('./routes/orderRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const cateringRoutes = require('./routes/cateringRoutes');
const familyRoutes = require('./routes/familyRoutes');
const weddingRoutes = require('./routes/weddingRoutes'); 
const getBookingsRoutes = require('./routes/getBookings');
const foodOrderRoutes = require('./routes/foodOrders');
const revenueRoutes = require('./routes/revenueRoutes'); 
const bookingsRoutes = require('./routes/bookings');
const userRoutes = require('./routes/User');
// Routes
const paymentRoutes = require("./routes/paymentRoutes");





const authMiddleware = require("./middleware/authMiddleware");

// Initialize dotenv for environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());  // Parses JSON request bodies




const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service (e.g., Gmail, Outlook, etc.)
    auth: {
      user: "your_email@gmail.com", // Replace with your email
      pass: "your_email_password", // Replace with your email password or app-specific password
    },
  });
  
  // Endpoint to send email
  app.post("/api/send-email", async (req, res) => {
    const { email, offerName } = req.body;
  
    try {
      // Send Email
      await transporter.sendMail({
        from: "your_email@gmail.com", // Sender email
        to: email, // Recipient email
        subject: "New Offer Added", // Email subject
        text: `Thank you for adding the offer: ${offerName}`, // Email body
      });
  
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    }
  });
  

// Public Routes (No Authentication Required)
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productsRoute);
app.use('/api/offers', offerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/birthday', birthdayRoutes);
app.use('/api/catering', cateringRoutes);
app.use('/api/family', familyRoutes);
app.use('/api/wedding', weddingRoutes);
app.use('/api/getBookings', getBookingsRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/users', userRoutes);  // Added back

// Authenticated Routes (Requires `authMiddleware`)
app.use("/api/foodOrders", authMiddleware, foodOrderRoutes);
app.use("/api/revenue", authMiddleware, revenueRoutes);
app.use("/api/bookings", authMiddleware, bookingsRoutes);
app.use("/api/cart", cartRoutes);




app.use("/api", paymentRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
