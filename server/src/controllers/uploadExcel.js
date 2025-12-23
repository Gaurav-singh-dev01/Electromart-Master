const XLSX = require("xlsx");
const path = require("path");
const pool = require("../db");
const fs = require("fs"); 


function validateLocalImage(imagePath) {
  if (!imagePath) return true; // empty allowed

  const allowedExt = [".jpg", ".png", ".webp", ".avif"];
  const ext = path.extname(imagePath).toLowerCase();

  if (!allowedExt.includes(ext)) {
    return false;
  }

  const absolutePath = path.join(
    process.cwd(),
    imagePath.replace(/^\/+/, "")
  );

  return fs.existsSync(absolutePath);
}


function parseSpecifications(text) {
  if (!text) return [];

  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  const rows = [];

  lines.forEach(line => {
    // ❗ Heading (no colon)
    if (!line.includes(":")) {
      rows.push({
        type: "section",
        title: line
      });
    } 
    // ✅ Key : Value
    else {
      const [key, ...rest] = line.split(":");
      rows.push({
        type: "item",
        key: key.trim(),
        value: rest.join(":").trim()
      });
    }
  });

  return rows;
}
exports.uploadExcel = async (req, res) => { 
   console.log("Override:", req.query.override);
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join("uploads", req.file.filename);
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const products = XLSX.utils.sheet_to_json(sheet, { defval: null });
    console.log("FIRST ROW 👉", products[0]);
    
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    for (const p of products) {

  if (!p.articleId) {
    throw new Error("articleId missing in Excel file");
  }

  // 🔥 YAHI PAR CALL KARNA HAI  
  await conn.query(
    `INSERT INTO products (
      articleId, category, name, brand, model, color,
      price, mrp, rating, discountPercent, image,
      description, stock, slug, specifications
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      p.articleId,
      p.category,
      p.name,
      p.brand,
      p.model,
      p.color,
      p.price || 0,
      p.mrp || p.price || 0,
      p.rating || 0,
      p.discountPercent || 0,
      p.image,
      p.description,
      p.stock || 0,
      p.slug,
      p.specifications || ""
    ]
  );
}

    await conn.commit();
    conn.release();

    res.json({
      message: "Excel uploaded successfully",
      inserted: products.length
    });

  } catch (err) {
  console.error("UPLOAD EXCEL FULL ERROR 👉", err);

  return res.status(500).json({
    message: "Excel upload failed",
    error: err.sqlMessage || err.message
  });
}
};