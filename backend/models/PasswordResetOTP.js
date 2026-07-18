const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },

    otp: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    // Number of wrong OTP attempts
    attempts: {
      type: Number,
      default: 0,
    },

    // Prevent OTP spam
    lastSentAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically remove expired OTPs
passwordResetSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

module.exports = mongoose.model(
  "PasswordResetOTP",
  passwordResetSchema
);