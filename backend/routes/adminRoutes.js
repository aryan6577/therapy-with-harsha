const express = require("express");

const router = express.Router();

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getAllPatients,
  getPatient,
  deletePatientRecord,
} = require("../controllers/adminController");

// ======================================
// Dashboard
// ======================================

router.get(
  "/dashboard-stats",
  verifyToken,
  verifyAdmin,
  getDashboardStats
);

// ======================================
// Patients
// ======================================

// Get all patients
router.get(
  "/patients",
  verifyToken,
  verifyAdmin,
  getAllPatients
);

// Get single patient
router.get(
  "/patients/:id",
  verifyToken,
  verifyAdmin,
  getPatient
);

// Delete patient permanently
router.delete(
  "/patients/:patientId",
  verifyToken,
  verifyAdmin,
  deletePatientRecord
);

module.exports = router;