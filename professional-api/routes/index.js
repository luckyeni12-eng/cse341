const express = require("express");
const router = express.Router();

const professionalRoutes = require("./professional");

// Default route
router.get("/", (req, res) => {
  res.json({
    message: "Professional API is running."
  });
});

// Professional route
router.use("/professional", professionalRoutes);

module.exports = router;