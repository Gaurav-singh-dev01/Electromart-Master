const pool = require("../db");
const XLSX = require("xlsx");
const path = require("path");
const { getProductImages } = require("../utils/imageLoader");

/* =====================================================
   🔥 GET PRODUCTS (LISTING)
===================================================== */
const getProducts = async (req, res) => {
  try {
    const { category } = req.query;

    let sql = "SELECT * FROM products";
    const values = [];

    // ✅ CATEGORY FILTER (FINAL FIX)
    if (category) {
      sql += " WHERE category = ?";
      values.push(category);
    }

    sql += " ORDER BY createdAt DESC";

    const [rows] = await pool.query(sql, values);

    res.json({ products: rows });
  } catch (err) {
    console.error("getProducts error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
 

/* =====================================================
   🔍 GET PRODUCT BY SLUG (DETAIL PAGE)
===================================================== */
const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM products WHERE slug = ? LIMIT 1",
      [slug]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = rows[0];

    const imageKey = product.image_key || null;
    const images = getProductImages(product.category, product.brand, imageKey);

    // 🔥 MAIN IMAGE RESOLVER (DETAIL PAGE)
    let mainImage = null;

    if (images.thumbnails?.length) {
      mainImage =
        images.thumbnails.find(img =>
          img.toLowerCase().includes("main")
        ) || images.thumbnails[0];
    }

    if (!mainImage && product.image) {
      mainImage = product.image;
    }

    if (!mainImage) {
      mainImage = "/Products/no-image.png";
    }

    product.images = images;
    product.mainImage = mainImage;

    res.json(product);
  } catch (err) {
    console.error("getProductBySlug error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   📥 EXCEL UPLOAD (UNCHANGED)
===================================================== */
const uploadProductsExcel = async (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      "../uploads/",
      req.file.filename
    );

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const products = XLSX.utils.sheet_to_json(sheet);

    for (let p of products) {
      if (!p.name) continue;

      const slug = p.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      await pool.query(
        `INSERT INTO products
         (articleId, name, category, brand, price, image, description, slug)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.articleId || null,
          p.name,
          p.category || "",
          p.brand || "",
          p.price || 0,
          p.image || "",
          p.description || "",
          slug
        ]
      );
    }

    res.json({ message: "Products uploaded successfully!" });
  } catch (err) {
    console.error("Excel Upload Error:", err);
    res.status(500).json({
      message: "Excel upload failed",
      error: err.message
    });
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  uploadProductsExcel
};