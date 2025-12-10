const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadExcel } = require("../controllers/uploadExcel");

router.post("/", upload.single("excel"), uploadExcel);
module.exports = router;