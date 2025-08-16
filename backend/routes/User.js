// backend/routes/users.js

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const mongoose = require("mongoose");


// GET /api/users - Retrieve all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server error fetching users" });
  }
});



router.post('/', async (req, res) => {
  const { name, email, password, address, notifications } = req.body;
  try {
    const newUser = new User({ name, email, password, address, notifications });
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, data: savedUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ success: false, message: "Server error adding user" });
  }
});







// PUT /api/users/update/:id - Update an existing user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phoneNumber ,address, notifications } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password, phoneNumber,address, notifications },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Server error updating user" });
  }
});

// DELETE /api/users/delete/:id - Delete a user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Server error deleting user" });
  }
});







router.get("/address/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's address
    res.status(200).json({ address: user.address });
  } catch (error) {
    console.error("Error fetching user address:", error);
    res.status(500).json({ message: "Failed to fetch address" });
  }
});

// UPDATE user address by user ID
router.put("/address/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { address } = req.body;

    // Find the user and update their address
    const user = await User.findByIdAndUpdate(
      userId,
      { address },
      { new: true } // Return the updated user
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the updated address
    res.status(200).json({ address: user.address });
  } catch (error) {
    console.error("Error updating user address:", error);
    res.status(500).json({ message: "Failed to update address" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, message: "Server error fetching user details" });
  }
});

// Update user details
router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid User ID:", id);
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  const { name, email, phoneNumber, address } = req.body;
  console.log("🔹 Received update request for user ID:", id);
  console.log("🔹 Request body:", req.body);

  try {
    // Find user first
    const user = await User.findById(id);
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("✅ Existing User Found:", user);

    // Check if phone number is already in use by another user
    if (phoneNumber) {
      const existingUser = await User.findOne({ phoneNumber, _id: { $ne: id } });
      if (existingUser) {
        console.log("❌ Phone number already exists:", phoneNumber);
        return res.status(400).json({ success: false, message: "Phone number already in use." });
      }
    }

    // Prepare update fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    if (address) updateFields.address = address;

    console.log("🔹 Updating User with fields:", updateFields);

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      console.log("❌ User not found after update");
      return res.status(404).json({ success: false, message: "User not found after update" });
    }

    console.log("✅ User updated successfully:", updatedUser);

    res.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("❌ Error updating user details:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
    }

    res.status(500).json({ success: false, message: "Server error updating user details" });
  }
});



router.get("/notifications/fetch/:id",  async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("notifications");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: { notifications: user.notifications } });
  } catch (error) {
    console.error("❌ Error fetching notification setting:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



router.put("/notifications/:id",  async (req, res) => {
  try {
    console.log("🔹 Received request body:", req.body);

    const { notifications } = req.body;
    if (typeof notifications !== "boolean") {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { notifications },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("✅ Updated user:", updatedUser);

    res.json({ success: true, message: "Notification preference updated", data: { notifications: updatedUser.notifications } });
  } catch (error) {
    console.error("❌ Error updating notification setting:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// Fetch count of users
router.get("/user/count", async (req, res) => {
  try {
    console.log("Fetching users...");
    const users = await User.find({});
    console.log("Users fetched successfully:", users.length);
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, message: "Server error fetching user details" });
  }
});






module.exports = router;