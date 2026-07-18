const express = require("express");

const router = express.Router();

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

const {
  saveAvailability,
  getAvailability,
  getAvailabilityByDay,
} = require("../controllers/availabilityController");

// Admin only
router.post(
  "/save",
  verifyToken,
  verifyAdmin,
  saveAvailability
);

// Public
router.get(
  "/",
  getAvailability
);

router.get(
  "/:day",
  getAvailabilityByDay
);

module.exports = router;