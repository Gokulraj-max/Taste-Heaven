//admin page get all orders and update status of orders

const express = require('express');
const Product = require('../models/product');

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    console.log("Fetching products from database...");
    const products = await Product.find();
    console.log("Products fetched:", products);
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products", details: err.message });
  }
});


// POST /api/products - Add a new product
router.post('/', async (req, res) => {
  const { name, price, oldPrice, discount, image, category, description } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      oldPrice,
      discount,
      image,
      category,
      description
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error adding product" });
  }
});

// PUT /api/products/:id - Update an existing product
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, oldPrice, discount, image, category, description } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, oldPrice, discount, image, category, description },
      { new: true } // return updated document
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error updating product" });
  }
});

module.exports = router;

