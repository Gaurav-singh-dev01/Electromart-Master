const pool = require('../../src/db'); 
const XLSX = require("xlsx");
const path = require("path");

exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      brand,
      price_min,
      price_max,
      q,
      sort,
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);

    let whereClauses = [];
    let params = [];

    if (category && category !== "all") { 
      whereClauses.push("category = ?"); 
      params.push(category); 
    }

    if (brand) { 
      whereClauses.push("brand = ?"); 
      params.push(brand); 
    }

    if (price_min) { 
      whereClauses.push("price >= ?"); 
      params.push(Number(price_min)); 
    }

    if (price_max) { 
      whereClauses.push("price <= ?"); 
      params.push(Number(price_max)); 
    }

    if (q) { 
      whereClauses.push("(title LIKE ? OR brand LIKE ?)"); 
      params.push(`%${q}%`, `%${q}%`); 
    }

    const whereSql = whereClauses.length ? "WHERE " + whereClauses.join(" AND ") : "";

    // sorting
    let orderBy = "ORDER BY id DESC";
    if (sort === "price_asc") orderBy = "ORDER BY price ASC";
    if (sort === "price_desc") orderBy = "ORDER BY price DESC";
    if (sort === "rating_desc") orderBy = "ORDER BY rating DESC";

    const [countRows] = await pool.query(
      `SELECT COUNT(*) AS total FROM products ${whereSql}`,
      params
    );

    const totalItems = countRows[0].total;

    const dataParams = [...params, Number(limit), Number(offset)];

    const [rows] = await pool.query(
      `SELECT id, name, category, brand, price, rating, discountPercent, stock, image, description, slug
FROM products
       ${whereSql}
       ${orderBy}
       LIMIT ? OFFSET ?`,
      dataParams
    );

    const nextPage =
      offset + rows.length < totalItems ? Number(page) + 1 : null;

    res.json({
      products: rows,
      totalItems,
      page: Number(page),
      perPage: Number(limit),
      nextPage,
    });
  } catch (err) {
    console.error("getProducts error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createProduct = (req, res) => {
   const { name, price } = req.body;

   if (!name || !price) {
     return res.status(400).json({ message: "Name and price required" });
   }

   res.status(201).json({
     message: "Product created successfully",
     product: { name, price }
   });
};

exports.getProductById = async (req, res) => {
  try {
    const slug = String(req.params.slug || "").toLowerCase();

    const [rows] = await pool.query(
      "SELECT * FROM products WHERE LOWER(slug) = ?",
      [slug]
    );

    if (rows.length === 0) return res.status(404).json({ message: "Product not found" });

    const product = rows[0];

    // Thumbnail + main images
    const [imgRows] = await pool.query(
      "SELECT image FROM product_images WHERE product_id = ?",
      [product.id]
    );

    const extraImages = imgRows.map(row => row.image);
    product.images = [product.image, ...extraImages];

    // Description images
    const [descImgRows] = await pool.query(
      "SELECT image_url FROM product_description_images WHERE product_id = ?",
      [product.id]
    );

    product.descriptionImages = descImgRows.map(img => img.image_url);

    return res.json(product);
  } catch (err) {
    console.error("getProductById error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

function createSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')  // Only a-z, 0-9 and hyphens
    .replace(/^-+|-+$/g, '');     // Trim leading/trailing hyphens
}
exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price required" });
    }

    // 🔹 Generate slug
    const slug = createSlug(name);

    // 🔹 Insert into DB
    const [result] = await pool.query(
      "INSERT INTO products (name, price, slug) VALUES (?, ?, ?)",
      [name, price, slug]
    );

    res.status(201).json({
      message: "Product created successfully",
      product: { id: result.insertId, name, price, slug }
    });
  } catch (err) {
    console.error("createProduct error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

 
exports.uploadProductsExcel = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../uploads/", req.file.filename);
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const products = XLSX.utils.sheet_to_json(sheet);

    for (let p of products) {
      await pool.query(
        "INSERT INTO products (name, category, brand, price, image, description, slug) VALUES (?,?,?,?,?,?,?)",
        [
          p.name,
          p.category,
          p.brand,
          p.price,
          p.image,
          p.description,
          generateSlug(p.name),
        ]
      );
    }

    res.json({ message: "Products uploaded successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Import failed" });
  }
};