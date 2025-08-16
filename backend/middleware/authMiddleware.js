// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const authMiddleware = async (req, res, next) => {
//   let token;

//   console.log("🚀 Received Authorization Header:", req.headers.authorization || "None"); // Debugging log

//   try {
//     // Extract token from Authorization header or cookies
//     token = req.headers.authorization?.startsWith("Bearer") 
//               ? req.headers.authorization.split(" ")[1] 
//               : req.cookies?.token;  // Support cookie-based authentication

//     if (!token) {
//       console.log("🚨 No token provided.");
//       return res.status(401).json({ success: false, message: "No token, authorization denied" });
//     }

//     // Verify JWT Token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("✅ Decoded User:", decoded);

//     // Attach User Object (Without Password)
//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) {
//       console.log("🚨 User not found in DB.");
//       return res.status(401).json({ success: false, message: "User not found. Unauthorized" });
//     }

//     next(); // Proceed to the next middleware
//   } catch (error) {
//     console.error("🚨 JWT Verification Error:", error.message);
//     return res.status(401).json({ success: false, message: error.message || "Invalid token." });
//   }
  
// };



// module.exports = authMiddleware;
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  let token;

  console.log("🚀 Received Authorization Header:", req.headers.authorization || "None"); // Debugging log
  console.log("🍪 Received Cookies:", req.cookies || "None"); // Debugging log

  try {
    // Extract token from Authorization header or cookies
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]; // Extract token from "Bearer <token>"
    } else if (req.cookies?.token) {
      token = req.cookies.token; // Extract token from cookies
    }

    if (!token) {
      console.log("🚨 No token provided.");
      return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    // Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded User:", decoded);

    // Attach User Object (Without Password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      console.log("🚨 User not found in DB.");
      return res.status(401).json({ success: false, message: "User not found. Unauthorized" });
    }

    console.log("✅ Authenticated User:", req.user); // Debugging log
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("🚨 JWT Verification Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired. Please log in again." });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
    }

    return res.status(401).json({ success: false, message: error.message || "Unauthorized" });
  }
};

module.exports = authMiddleware;