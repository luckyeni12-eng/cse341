const express = require("express");
const router = express.Router();

const professionalController = require("../controllers/professional");

// GET /professional
router.get("/", professionalController.getProfessional);

module.exports = router;