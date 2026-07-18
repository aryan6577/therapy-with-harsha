const express = require("express");

const router = express.Router();

const {
  verifyToken,
  verifyPatient,
} = require("../middleware/authMiddleware");

const {
  saveProfile,
  getProfile,
} = require("../controllers/patientController");

// ===================================
// Patient Profile
// ===================================

// Save Patient Intake Form
router.put(
  "/profile",
  verifyToken,
  verifyPatient,
  saveProfile
);

// Get Patient Profile
router.get(
  "/profile",
  verifyToken,
  verifyPatient,
  getProfile
);

module.exports = router;