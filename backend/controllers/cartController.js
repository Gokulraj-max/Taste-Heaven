// backend/controllers/cartController.js
// const Cart = require('../models/cart');

// // Add to Cart
// exports.addToCart = async (req, res) => {
//   const { productId, quantity } = req.body;
//   const userId = req.user._id;

//   try {
//     // Check if item is already in the cart
//     const existingCartItem = await Cart.findOne({ user: userId, product: productId });

//     if (existingCartItem) {
//       existingCartItem.quantity += quantity;
//       await existingCartItem.save();
//     } else {
//       await Cart.create({ user: userId, product: productId, quantity });
//     }

//     res.status(201).json({ message: 'Product added to cart' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to add product to cart', error });
//   }
// };

// // Get Cart Items for User
// exports.getCartItems = async (req, res) => {
//   const userId = req.user._id;

//   try {
//     const cartItems = await Cart.find({ user: userId }).populate('product');
//     res.json(cartItems);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch cart items', error });
//   }
// };

// // Remove from Cart
// exports.removeFromCart = async (req, res) => {
//   const cartItemId = req.params.id;

//   try {
//     await Cart.findByIdAndDelete(cartItemId);
//     res.json({ message: 'Product removed from cart' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to remove product from cart', error });
//   }
// };



const Cart = require("../models/cart"); // Import your Cart model

// exports.removeFromCart = async (req, res) => {
//   try {
//     const userId = req.user.id; // Ensure the user is authenticated
//     const itemId = req.params.id; // Item ID from request

//     const updatedCart = await Cart.findOneAndUpdate(
//       { userId },
//       { $pull: { items: { _id: itemId } } }, // Removes only the specific item
//       { new: true }
//     );

//     if (!updatedCart) {
//       return res.status(404).json({ message: "Item not found in cart" });
//     }

//     res.status(200).json({ message: "Item removed successfully", updatedCart });
//   } catch (error) {
//     console.error("Error removing item from cart:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// exports.addToCart = (req, res) => {
//   try {
//       const { productId, quantity } = req.body;
      
//       if (!productId || !quantity) {
//           return res.status(400).json({ message: "Product ID and quantity are required." });
//       }

//       res.status(200).json({ message: "Product added to cart successfully" });
//   } catch (error) {
//       res.status(500).json({ message: "Internal Server Error" });
//   }
// };

exports.getCartItems = (req, res) => {
  try {
      res.status(200).json({ message: "Cart items retrieved successfully", items: [] });
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addToCart = (req, res) => {
  try {
      res.status(201).json({ message: "Item added to cart" });
  } catch (error) {
      res.status(500).json({ message: "Error adding to cart" });
  }
};

exports.removeCartItem = (req, res) => {
  try {
      res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
      res.status(500).json({ message: "Error removing item" });
  }
};




//deeppppppp
// const Cart = require('../models/cart');
// const Product = require('../models/product');
// const mongoose = require('mongoose');

// // Add to Cart
// exports.addToCart = async (req, res) => {
//   const { productId, quantity } = req.body;
//   const userId = req.user._id;

//   try {
//     // Input validation
//     if (!productId || !quantity) {
//       return res.status(400).json({ message: 'Product ID and quantity are required' });
//     }

//     if (quantity <= 0) {
//       return res.status(400).json({ message: 'Quantity must be a positive number' });
//     }

//     // Check if product exists
//     const productExists = await Product.findById(productId);
//     if (!productExists) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Check if item is already in the cart
//     let cartItem = await Cart.findOne({ user: userId, product: productId });

//     if (cartItem) {
//       cartItem.quantity += quantity;
//     } else {
//       cartItem = new Cart({ user: userId, product: productId, quantity });
//     }

//     await cartItem.save();
//     res.status(201).json({ message: 'Product added to cart', cartItem });
//   } catch (error) {
//     console.error('Error in addToCart:', error);
//     res.status(500).json({ message: 'Failed to add product to cart', error: error.message });
//   }
// };

// // Get Cart Items for User
// exports.getCartItems = async (req, res) => {
//   const userId = req.user._id;

//   try {
//     const cartItems = await Cart.find({ user: userId }).populate('product');
//     res.json(cartItems);
//   } catch (error) {
//     console.error('Error in getCartItems:', error);
//     res.status(500).json({ message: 'Failed to fetch cart items', error: error.message });
//   }
// };

// // Remove from Cart
// exports.removeFromCart = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Validate cart item ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid cart item ID' });
//     }

//     // Check if cart item exists
//     const cartItem = await Cart.findById(id);
//     if (!cartItem) {
//       return res.status(404).json({ message: 'Cart item not found' });
//     }

//     await Cart.findByIdAndDelete(id);
//     res.json({ message: 'Product removed from cart' });
//   } catch (error) {
//     console.error('Error in removeFromCart:', error);
//     res.status(500).json({ message: 'Failed to remove product from cart', error: error.message });
//   }
// };