const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const XLSX = require("xlsx");
const pool = require("../db");
const fs = require("fs");

const productCtrl = require("../controllers/ProductController");

/* ----------------------------------------------------
   🟢 1) Get all products with serial number
-----------------------------------------------------*/
router.get("/all-products", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        *,
        ROW_NUMBER() OVER (ORDER BY id ASC) AS serial_no
      FROM products
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ----------------------------------------------------
   🟢 2) Product APIs
-----------------------------------------------------*/
router.get("/", productCtrl.getProducts);              // product listing
router.get("/slug/:slug", productCtrl.getProductBySlug); // single product

/* ----------------------------------------------------
   Utility
-----------------------------------------------------*/
function safeTrim(val) {
  return val ? String(val).trim() : "";
}

/* ----------------------------------------------------
   Multer + Upload Folder Setup
-----------------------------------------------------*/
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ----------------------------------------------------
   🟢 3) Excel Upload Route
-----------------------------------------------------*/
router.post("/upload-excel", upload.single("excel"), async (req, res) => {
  try {
    const override = req.query.override === "true";

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.read(req.file.buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    if (!rows.length) {
      return res.status(400).json({ message: "Excel is empty" });
    }

    const excelNames = rows
      .map(r => safeTrim(r.name || r.Name))
      .filter(Boolean);

    const [existing] = await pool.query(
      `SELECT name FROM products WHERE name IN (?)`,
      [excelNames]
    );

    if (existing.length && !override) {
      return res.status(409).json({
        message: "Duplicate products found",
        duplicates: existing.map(p => p.name),
      });
    }

    if (override && existing.length) {
      await pool.query(
        `DELETE FROM products WHERE name IN (?)`,
        [excelNames]
      );
    }

    const filePath = path.join(
      uploadsDir,
      Date.now() + "-" + req.file.originalname.replace(/\s+/g, "_")
    );
    fs.writeFileSync(filePath, req.file.buffer);

    for (const r of rows) {
      const articleId = Number(r.articleId);
      if (!articleId) continue;

      const name = safeTrim(r.name || r.Name);
      if (!name) continue;

      const price = Number(r.price) || 0;
      const mrp =
        Number(String(r.mrp).replace(/[^0-9.]/g, "")) || price;

      const category = safeTrim(r.category);
      const brand = safeTrim(r.brand);
      const model = safeTrim(r.model || r.Model);
      const color = safeTrim(r.color || r.Color);
      const description = safeTrim(r.description);
      const image = safeTrim(r.image);
      const rating = Number(r.rating) || 0;
      const discountPercent = Number(r.discountPercent) || 0;
      const stock = Number(r.stock) || 0;
      const specifications = safeTrim(r.specifications);

      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      await pool.query(
        `INSERT INTO products
         (articleId, category, name, brand, model, color, price, mrp, rating,
          discountPercent, image, description, stock, slug, specifications)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          articleId,
          category,
          name,
          brand,
          model,
          color,
          price,
          mrp,
          rating,
          discountPercent,
          image,
          description,
          stock,
          slug,
          specifications,
        ]
      );
    }

    res.json({
      message: override
        ? "Products overridden & inserted successfully"
        : "Products inserted successfully",
      inserted: rows.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

module.exports = router;