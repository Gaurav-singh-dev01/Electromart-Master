// server/src/routes/products.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const XLSX = require("xlsx");
const pool = require("../db"); // your DB connection (mysql2/promise pool or similar)
const fs = require("fs");

// --- Multer config: save into <server-root>/uploads ---
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ---------------------- ROUTES ----------------------

// 1) Get all products (frontend list)
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    // Return an object with products key so frontend helpers expecting res.data.products work
    return res.json({ products: rows });
  } catch (err) {
    console.error("GET /products error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 2) Get product by slug (for product page)
router.get("/slug/:slug", async (req, res) => {
  try {
    const slugParam = String(req.params.slug || "").toLowerCase().trim();

    const [productRows] = await pool.query(
      "SELECT * FROM products WHERE LOWER(slug) = ? LIMIT 1",
      [slugParam]
    );

    if (!productRows || productRows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = productRows[0];

    // Ensure product has consistent fields expected by frontend
    // images: array (if you store extra images in separate table, fetch them; otherwise fallback to product.image)
    try {
      const [imageRows] = await pool.query(
        "SELECT image FROM product_images WHERE product_id = ?",
        [product.id]
      );
      const extraImages = Array.isArray(imageRows) ? imageRows.map((r) => r.image).filter(Boolean) : [];
      product.images = [];
      if (product.image) product.images.push(product.image);
      product.images = product.images.concat(extraImages);
    } catch (err) {
      // if product_images table doesn't exist or query fails, just fallback
      product.images = product.image ? [product.image] : [];
    }

    // descriptionImages: array (optional table)
    try {
      const [descRows] = await pool.query(
        "SELECT image_url FROM product_description_images WHERE product_id = ?",
        [product.id]
      );
      product.descriptionImages = Array.isArray(descRows) ? descRows.map((r) => r.image_url).filter(Boolean) : [];
    } catch (err) {
      product.descriptionImages = [];
    }

    // Ensure other fields exist so frontend won't crash
    product.specifications = product.specifications || "";
    product.rating = product.rating || 0;
    product.discountPercent = product.discountPercent || 0;
    product.stock = typeof product.stock === "number" ? product.stock : (product.stock ? Number(product.stock) : 0);

    return res.json(product);
  } catch (err) {
    console.error("GET /slug/:slug error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 3) Upload Excel & insert into DB
router.post("/upload-excel", upload.single("excel"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = path.join(uploadsDir, req.file.filename);

    // Read workbook
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });

    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ message: "Excel sheet is empty or invalid" });
    }

    // Insert rows into DB. Map Excel headers to DB columns.
    // Expected minimal Excel columns: name, price
    // Optional: category, brand, description, image, stock, discountPercent, rating
    let inserted = 0;
    const insertedIds = [];

    for (const r of rows) {
      const name = (r.name || r.Name || r.NAME || "").toString().trim();
      const priceRaw = r.price || r.Price || r.PRICE || r.sale_price || null;
      const price = priceRaw !== null && priceRaw !== undefined ? Number(priceRaw) : 0;

      if (!name) continue; // skip rows without name

      const category = r.category || r.Category || "";
      const brand = r.brand || r.Brand || "";
      const description = r.description || r.Description || "";
      const image = r.image || r.Image || "";
      const stock = r.stock !== undefined ? Number(r.stock) : 0;
      const discountPercent = r.discountPercent !== undefined ? Number(r.discountPercent) : 0;
      const rating = r.rating !== undefined ? Number(r.rating) : 0;

      // generate slug (basic)
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const [result] = await pool.query(
        `INSERT INTO products 
          (name, price, category, brand, description, image, slug, stock, discountPercent, rating)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, price || 0, category, brand, description, image, slug, stock, discountPercent, rating]
      );

      if (result && result.insertId) {
        inserted++;
        insertedIds.push(result.insertId);
      }
    }

    return res.json({ message: "Excel uploaded & data inserted", inserted, insertedIds });
  } catch (err) {
    console.error("POST /upload-excel error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;