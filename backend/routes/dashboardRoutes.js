const express = require("express");

const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const {
  getDashboard,
} = require("../controllers/dashboardController");

// =====================================
// Patient Dashboard
// =====================================

router.get(
  "/",
  verifyToken,
  getDashboard
);

module.exports = router;