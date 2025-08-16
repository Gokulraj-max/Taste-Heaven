// //login and registration routes

// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const nodemailer = require('nodemailer');
// const bcrypt = require("bcryptjs");
// const authMiddleware = require("../middleware/authMiddleware");

// // ✅ Login Route
// // router.post('/login', async (req, res) => {
// //     const { email, password } = req.body;

// //     try {
// //         const user = await User.findOne({ email });
// //         if (!user) return res.status(400).json({ success: false, message: "User not found" });

// //         const isMatch = await bcrypt.compare(password, user.password);
// //         if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

// //         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

// //         res.json({ success: true, user: { id: user._id, role: user.role }, token });

// //     } catch (error) {
// //         console.error("🚨 Login Error:", error);
// //         res.status(500).json({ success: false, message: 'Server error' });
// //     }
// // });
// // const login = async (email, password) => {
// //   try {
// //     const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });

// //     if (!data.token) {
// //       console.error("🚨 No token received from backend");
// //       return { success: false, message: "Authentication failed" };
// //     }

// //     // Debug: Log the user data to ensure role is present
// //     console.log("User data from backend:", data.user);

// //     localStorage.setItem("token", data.token);
// //     localStorage.setItem("user", JSON.stringify(data.user));
// //     axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
// //     setUser(data.user);

// //     // Redirect based on user role
// //     if (data.user.role === "admin") {
// //       navigate("/admin/dashboard"); // Redirect to admin dashboard
// //     } else {
// //       navigate("/services"); // Redirect to home page for regular users
// //     }

// //     return { success: true };
// //   } catch (err) {
// //     console.error("🚨 Login error:", err.response?.data || err);
// //     return { success: false, message: err.response?.data?.message || "Login failed" };
// //   }
// // };
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ success: false, message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Ensure the response includes the role
//     res.json({ success: true, user: { id: user._id, role: user.role }, token });

//   } catch (error) {
//     console.error("🚨 Login Error:", error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });
// // ✅ Register Route
// router.post('/register', async (req, res) => {
//     const { name, email, password, role } = req.body;

//     try {
//         let user = await User.findOne({ email });
//         if (user) return res.status(400).json({ success: false, message: 'User already exists' });

//         const hashedPassword = await bcrypt.hash(password, 10);
//         user = new User({ name, email, password: hashedPassword, role: role || "user" });

//         await user.save();
//         res.status(201).json({ success: true, message: 'User registered successfully' });

//     } catch (error) {
//         console.error("🚨 Registration Error:", error);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });

// // ✅ Fetch User Details (Protected Route)
// router.get("/me", authMiddleware, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select("-password");
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }
//         res.json({ success: true, user });
//     } catch (error) {
//         console.error("🚨 Fetch User Error:", error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// });

// // Forgot password route
// // router.post('/forgot-password', async (req, res) => {
// //     const { email } = req.body;
// //     try {
// //       const user = await User.findOne({ email });
// //       if (!user) {
// //         return res.status(400).json({ message: 'User not found' });
// //       }
  
// //       const token = crypto.randomBytes(32).toString('hex');
// //       user.passwordResetToken = token;
// //       user.passwordResetExpires = Date.now() + 3600000; // 1 hour expiry
// //       await user.save();
  
// //       // Send the email with the reset link
// //       const transporter = nodemailer.createTransport({
// //         service: 'gmail',
// //         auth: {
// //           user: process.env.EMAIL,
// //           pass: process.env.EMAIL_PASSWORD,
// //         },
// //       });
  
// //       const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
// //       await transporter.sendMail({
// //         to: user.email,
// //         subject: 'Password Reset',
// //         html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
// //       });
  
// //       res.status(200).json({ message: 'Password reset link sent to your email' });
// //     } catch (error) {
// //       res.status(500).json({ message: 'Something went wrong, please try again.' });
// //     }
// //   });


  
  
  

// module.exports = router;


const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return user data (excluding password) and token
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("🚨 Login Error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ Register Route
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ success: false, message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role: role || "user" });

    await user.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error("🚨 Registration Error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ Fetch User Details (Protected Route)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("🚨 Fetch User Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

  // Reset password route
  router.post('/reset-password/:token', async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
  
    try {
      const user = await User.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      user.password = await bcrypt.hash(password, 10);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error resetting password. Please try again.' });
    }
  });


router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const token = crypto.randomBytes(32).toString('hex');
      user.passwordResetToken = token;
      user.passwordResetExpires = Date.now() + 3600000; // 1 hour expiry
      await user.save();
  
      // Create the reset link
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  
      // Set up email data
      const mailOptions = {
        to: user.email,
        subject: 'Password Reset',
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
      };
  
      // Send the email
      await nodemailer.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong, please try again.' });
    }
  });

module.exports = router;