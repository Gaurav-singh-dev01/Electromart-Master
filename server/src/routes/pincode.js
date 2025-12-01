const express = require("express");
const router = express.Router();

// Sample serviceable pincodes (replace with DB in real app)
const SERVICEABLE = {
  "110001": { cod: true, etaDays: 2 },
  "560001": { cod: false, etaDays: 4 },
  // add more
};

// Check delivery
router.get("/check/:pincode", (req, res) => {
  const { pincode } = req.params;

  if (!/^\d{6}$/.test(pincode)) {
    return res.status(400).json({ error: "Invalid pincode" });
  }

  const info = SERVICEABLE[pincode];
  if (info) {
    return res.json({ deliverable: true, cod: !!info.cod, etaDays: info.etaDays });
  }

  return res.json({ deliverable: false });
});

module.exports = router;