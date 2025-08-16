const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");
const authMiddleware = require("../middleware/authMiddleware");

// Submit feedback
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { userId, orderId, productName, rating, feedback } = req.body;

    if (!userId || !orderId || !productName || !rating || !feedback) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newFeedback = new Feedback({
      userId,
      orderId,
      productName,
      rating,
      feedback,
    });

    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Get all feedback for an admin panel
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const feedbackList = await Feedback.find().populate("userId", "name email");
    res.status(200).json(feedbackList);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Get feedback by user ID
router.get("/user/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const userFeedback = await Feedback.find({ userId });
    res.status(200).json(userFeedback);
  } catch (error) {
    console.error("Error fetching user feedback:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
