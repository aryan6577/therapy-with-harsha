const express = require("express");

const router = express.Router();

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

const {
  addHoliday,
  getHolidays,
  deleteHoliday,
} = require("../controllers/holidayController");

router.post(
  "/",
  verifyToken,
  verifyAdmin,
  addHoliday
);

router.get(
  "/",
  getHolidays
);

router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  deleteHoliday
);

module.exports = router;