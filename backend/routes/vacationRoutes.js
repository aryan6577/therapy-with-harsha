const express = require("express");

const router = express.Router();

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

const {
  addVacation,
  getVacations,
  deleteVacation,
} = require("../controllers/vacationController");

router.post(
  "/",
  verifyToken,
  verifyAdmin,
  addVacation
);

router.get(
  "/",
  getVacations
);

router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  deleteVacation
);

module.exports = router;