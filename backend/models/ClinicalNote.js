const mongoose = require("mongoose");

const clinicalNoteSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    mood: {
      type: String,
      default: "",
    },

    sleep: {
      type: String,
      default: "",
    },

    stressLevel: {
      type: String,
      enum: [
        "Low",
        "Moderate",
        "High",
      ],
      default: "Moderate",
    },

    diagnosis: {
      type: String,
      default: "",
    },

    homework: {
      type: String,
      default: "",
    },

    therapistNotes: {
      type: String,
      default: "",
    },

    nextSessionRecommendation: {
      type: String,
      default: "",
    },

    riskLevel: {
      type: String,
      enum: [
        "Low",
        "Moderate",
        "High",
      ],
      default: "Low",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ClinicalNote",
  clinicalNoteSchema
);