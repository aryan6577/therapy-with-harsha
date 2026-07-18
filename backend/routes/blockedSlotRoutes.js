const express = require("express");

const router = express.Router();

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

const {
  addBlockedSlot,
  getBlockedSlots,
  deleteBlockedSlot,
} = require("../controllers/blockedSlotController");

router.post(
  "/",
  verifyToken,
  verifyAdmin,
  addBlockedSlot
);

router.get(
  "/",
  getBlockedSlots
);

router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  deleteBlockedSlot
);

module.exports = router;