const Payment = require("../models/paymentModel");

exports.processPayment = async (req, res) => {
  const { method, details, productName, productImage } = req.body;
  const userId = req.user.id;

  console.log("Received payment request:", { method, details, productName, productImage, userId }); // Debugging

  try {
    // Validate payment details
    if (!method || !details || !productName || !productImage) {
      return res.status(400).json({ message: "Invalid payment details" });
    }

    // Simulate payment processing
    const transactionId = `TXN${Date.now()}`;
    const amount = 100; // Example amount

    // Save payment details to the database
    const payment = new Payment({
      userId,
      paymentMethod: method,
      productName,
      productImage,
      amount,
      transactionId,
      status: "Success",
    });

    await payment.save();

    console.log("Payment saved:", payment); // Debugging

    // Return success response
    res.status(200).json({
      message: "Payment successful",
      transactionId,
    });
  } catch (error) {
    console.error("Error processing payment:", error); // Debugging
    res.status(500).json({ message: "Payment failed" });
  }
};