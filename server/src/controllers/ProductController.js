const pool = require('../../src/db'); 
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
      `SELECT id, name, category, brand, price, rating, stock, image, description
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