const express = require("express");
const router = express.Router();
const pool = require("../db"); // DB connection
const { getProducts, createProduct, getProductById } = require("../controllers/ProductController");

// Get all products
router.get("/", getProducts);

// Create product
router.post("/", createProduct);

// Slug-based product fetch
router.get("/slug/:slug", async (req, res) => {
  try {
    const rawSlug = req.params.slug;
    const slug = decodeURIComponent(rawSlug).toLowerCase();

    const [rows] = await pool.query(
      "SELECT * FROM products WHERE LOWER(slug) = ?",
      [slug]
    );

    if (rows.length === 0) return res.status(404).json({ message: "Product not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("Slug route error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Fallback: single slug route (optional)
router.get("/:slug", getProductById);

module.exports = router;