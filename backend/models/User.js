// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     address: { type: String, default: "" },
//     phoneNumber: { type: String, default: "" },
//     notifications: { type: Boolean, default: false },
//     role: { type: String, default: "user" },
//     resetPasswordToken: { type: String },
//     resetPasswordExpires: { type: Date },
//   },
//   { timestamps: true }
// );

// // Hash password before saving (only if it's new or modified)
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }

//   try {
//     console.log("Before Hashing:", this.password); // Log plain text password

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);

//     console.log("After Hashing:", this.password); // Log hashed password
//     next();
//   } catch (error) {
//     console.error("Error hashing password:", error);
//     next(error);
//   }
// });

// // Compare entered password with stored hashed password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   console.log("Stored Hashed Password:", this.password);
//   console.log("Entered Password:", enteredPassword);

//   const isMatch = await bcrypt.compare(enteredPassword, this.password);
//   console.log("Password Match Status:", isMatch);
//   return isMatch;
// };

// // Prevent Overwriting the Model
// const User = mongoose.models.User || mongoose.model("User", userSchema);
// module.exports = User;



const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    // phoneNumber: { type: String, default: "+91" },
    notifications: { type: Boolean, default: false },
    role: { type: String, default: "user" },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

// Hash password before saving (only if it's new or modified and not already hashed)
userSchema.pre("save", async function (next) {
  // Skip if the password is not modified
  if (!this.isModified("password")) {
    return next();
  }

  // Skip if the password is already hashed
  if (this.password.startsWith("$2b$")) {
    console.log("Password is already hashed. Skipping re-hashing.");
    return next();
  }

  try {
    console.log("Before Hashing:", this.password); // Log plain text password

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    console.log("After Hashing:", this.password); // Log hashed password
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    next(error);
  }
});

// Compare entered password with stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("Stored Hashed Password:", this.password);
  console.log("Entered Password:", enteredPassword);

  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  console.log("Password Match Status:", isMatch);
  return isMatch;
};

// Prevent Overwriting the Model
const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;