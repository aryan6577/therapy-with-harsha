const express = require("express");

const router = express.Router();

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

const {
  saveClinicalNote,
  getClinicalNote,
} = require("../controllers/clinicalController");

router.post(
  "/save",
  verifyToken,
  verifyAdmin,
  saveClinicalNote
);

router.get(
  "/:appointmentId",
  verifyToken,
  verifyAdmin,
  getClinicalNote
);

module.exports = router;