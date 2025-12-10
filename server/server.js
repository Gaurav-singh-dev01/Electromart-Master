require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folders
app.use("/uploads", express.static("uploads"));
app.use("/images", express.static("images"));
app.use(express.static("public"));

// Routes
app.use("/api/products", require("./src/routes/products"));
app.use("/api/pincode", require("./src/routes/pincode"));
app.use("/api/upload-excel", require("./src/routes/uploadExcel")); 

// Test route
app.get("/", (req, res) => res.send("Backend API is running..."));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 