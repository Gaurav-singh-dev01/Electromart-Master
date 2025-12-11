const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const XLSX = require("xlsx");
const pool = require("../db");
const fs = require("fs"); 
const productCtrl = require("../controllers/ProductController");
 

// GET all products (main listing API)
router.get("/", productCtrl.getProducts);

// GET single product by slug
router.get("/slug/:slug", productCtrl.getProductById);
 
// Safe trim
function safeTrim(val) {
  return val ? String(val).trim() : "";
}

// Upload folder create if missing
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer config
const storage = multer.memoryStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage });
 

// -------------------------------------------------
// 🟩 FINAL — EXCEL UPLOAD ROUTE
// -------------------------------------------------
router.post("/upload-excel", upload.single("excel"), async (req, res) => {
  try {
    const override = req.query.override === "true";

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Read Excel from buffer
    const workbook = XLSX.read(req.file.buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    if (!rows.length) return res.status(400).json({ message: "Excel is empty" });

    // Extract names
    const excelNames = rows.map(r => safeTrim(r.name || r.Name)).filter(n => n);

    // Check duplicates
    const [existing] = await pool.query(`SELECT name FROM products WHERE name IN (?)`, [excelNames]);

    if (existing.length && !override) {
      return res.status(409).json({ message: "Duplicate products found", duplicates: existing.map(p => p.name) });
    }

    // If override, delete existing
    if (override && existing.length) {
      await pool.query(`DELETE FROM products WHERE name IN (?)`, [excelNames]);
    }

    // Save file to uploads folder **only now**
    const filePath = path.join(uploadsDir, Date.now() + "-" + req.file.originalname.replace(/\s+/g, "_"));
    fs.writeFileSync(filePath, req.file.buffer);

    // Insert products into DB
    for (const r of rows) {
      const name = safeTrim(r.name || r.Name);
      if (!name) continue;
      const price = Number(r.price) || 0;
      const category = safeTrim(r.category || r.Category || "");
      const brand = safeTrim(r.brand || r.Brand || "");
      const description = safeTrim(r.description || r.Description || "");
      const image = safeTrim(r.image || "");

      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

      await pool.query(
        `INSERT INTO products (name, price, category, brand, description, image, slug)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, price, category, brand, description, image, slug]
      );
    }

    return res.json({
      message: override ? "Products overridden & inserted successfully" : "Products inserted successfully",
      inserted: rows.length,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});
module.exports = router;