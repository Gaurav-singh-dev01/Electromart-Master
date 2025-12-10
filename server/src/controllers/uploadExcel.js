const XLSX = require("xlsx");
const path = require("path");
const pool = require("../db");

exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join("uploads", req.file.filename);

    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const products = XLSX.utils.sheet_to_json(sheet);

    res.json({
      message: "Excel uploaded",
      inserted: products.length
    });
  } catch (err) {
    console.log("Upload Excel Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};