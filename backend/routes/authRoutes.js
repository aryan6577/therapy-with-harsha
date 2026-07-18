const express = require("express");
const {
  registerValidation,
} = require("../middleware/validationMiddleware");
const router = express.Router();

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const {
  register,
  login,
  getMe,
} = require("../controllers/authController");

router.post(
  "/register",
  registerValidation,
  register
);

router.post(
  "/login",
  login
);

router.get(
  "/me",
  verifyToken,
  getMe
);

module.exports = router;