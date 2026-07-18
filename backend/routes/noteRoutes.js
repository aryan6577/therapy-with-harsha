const express = require("express");

const router = express.Router();

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

const {
  addNote,
  getPatientNotes,
} = require("../controllers/noteController");

router.post(
  "/",
  verifyToken,
  verifyAdmin,
  addNote
);

router.get(
  "/:patientId",
  verifyToken,
  verifyAdmin,
  getPatientNotes
);

module.exports = router;