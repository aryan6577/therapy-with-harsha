const mongoose = require("mongoose");

const vacationSchema = new mongoose.Schema(
  {
    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Vacation",
  vacationSchema
);