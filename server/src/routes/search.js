const express = require("express");
const router = express.Router();
const pool = require("../db"); // ✔ correct path

router.get("/", async (req, res) => {
  try {
    const q = req.query.q?.trim();

    if (!q) {
      return res.json([]);
    }

    const isNumeric = /^\d+$/.test(q);

    let sql = `
      SELECT 
        id,
        name,
        articleId,
        image,
        slug
      FROM products
      WHERE
    `;

    let params = [];

    // 🔹 CASE 1: ITEM CODE SEARCH (intellisense friendly)
    if (isNumeric) {
      sql += ` articleId LIKE ? `;
      params.push(`%${q}%`);
    }
    // 🔹 CASE 2: NAME / BRAND / CATEGORY SEARCH
    else {
      sql += `
        name LIKE ?
        OR brand LIKE ?
        OR category LIKE ?
      `;
      params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }

    sql += ` ORDER BY name ASC LIMIT 10`;

    const [rows] = await pool.query(sql, params);

    res.json(rows);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json([]);
  }
});

module.exports = router;