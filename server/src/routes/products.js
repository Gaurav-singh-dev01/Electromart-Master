const express = require("express");
const router = express.Router();

const { getProducts, createProduct } = require("../controllers/ProductController");
const { getProductById } = require("../controllers/ProductController");
router.get("/", getProducts);
router.post("/", createProduct);

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  res.json(rows[0]);
});
router.get("/products/:id", getProductById);

module.exports = router;



 