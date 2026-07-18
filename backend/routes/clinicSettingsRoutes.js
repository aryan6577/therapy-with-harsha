const express = require("express");

const router = express.Router();

const {
  getSettings,
  updateSettings,
  uploadQrCode,
} = require("../controllers/clinicSettingsController");

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/paymentUpload");

// Get settings
router.get(
  "/",
  getSettings
);

// Update settings
router.put(
  "/",
  verifyToken,
  verifyAdmin,
  updateSettings
);

// Upload QR Code
router.post(
  "/upload-qr",
  verifyToken,
  verifyAdmin,
  upload.single("paymentScreenshot"),
  uploadQrCode
);

module.exports = router;