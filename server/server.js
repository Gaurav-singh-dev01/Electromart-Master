require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());

// Static folders
app.use("/uploads", express.static("uploads"));
app.use("/images", express.static("images"));
app.use(express.static("public"));

// API Route (ONLY ONCE) 
app.use("/api/products", require("./src/routes/products"));  


// Test
app.get("/", (req, res) => res.send("Backend API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
console.log("Server running on port 5000");
});