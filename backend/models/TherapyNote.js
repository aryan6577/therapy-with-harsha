const mongoose = require("mongoose");

const therapyNoteSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },

    sessionNumber: Number,

    moodScore: {
      type: Number,
      min: 1,
      max: 10,
    },

    observations: String,

    treatmentPlan: String,

    homework: String,

    nextSessionDate: String,

    privateNotes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "TherapyNote",
  therapyNoteSchema
);