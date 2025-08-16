
//admin update the offers from admin panel

// const express = require("express");
// const Offer = require("../models/offer");

// const router = express.Router();

// // ✅ Sample GET route to fetch all offers
// router.get("/", async (req, res) => {
//   try {
//     const offers = await Offer.find();
//     res.json(offers);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch offers" });
//   }
// });

// // ✅ Export the router correctly
// module.exports = router;

const express = require("express");
const Offer = require("../models/offer");

const router = express.Router();

// GET all offers
router.get("/", async (req, res) => {
  try {
    console.log("Fetching offers from database...");
    const offers = await Offer.find();
    console.log("Offers fetched:", offers);
    // Always send an array, even if it's empty
    res.status(200).json(offers);
  } catch (err) {
    console.error("Error fetching offers:", err);
    res.status(500).json({ error: "Failed to fetch offers", details: err.message });
  }
});
// // GET /api/offers - Retrieve all offers
// router.get('/', async (req, res) => {
//   try {
//     const offers = await Offer.find();
//     res.json(offers);
//   } catch (error) {
//     console.error("Error fetching offers:", error);
//     res.status(500).json({ message: "Server error fetching offers" });
//   }
// });

// POST /api/offers - Add a new offer
router.post('/', async (req, res) => {
  const { name, description, image, price, originalPrice } = req.body;
  try {
    const newOffer = new Offer({
      name,
      description,
      image,
      price,
      originalPrice,
    });
    const savedOffer = await newOffer.save();
    res.status(201).json(savedOffer);
  } catch (error) {
    console.error("Error adding offer:", error);
    res.status(500).json({ message: "Server error adding offer" });
  }
});

// PUT /api/offers/:id - Update an existing offer
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, image, price, originalPrice } = req.body;
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(
      id,
      { name, description, image, price, originalPrice },
      { new: true }
    );
    if (!updatedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.json(updatedOffer);
  } catch (error) {
    console.error("Error updating offer:", error);
    res.status(500).json({ message: "Server error updating offer" });
  }
});

// DELETE /api/offers/:id - Delete an offer
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOffer = await Offer.findByIdAndDelete(id);
    if (!deletedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    console.error("Error deleting offer:", error);
    res.status(500).json({ message: "Server error deleting offer" });
  }
});

module.exports = router;
