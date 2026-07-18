const express = require("express");

const router = express.Router();

const {
  sendContactMessage,
} = require("../controllers/contactController");

// =====================================
// Contact Form
// =====================================

router.post(
  "/",
  sendContactMessage
);

module.exports = router;