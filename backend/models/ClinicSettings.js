const mongoose = require("mongoose");

const clinicSettingsSchema = new mongoose.Schema(
  {
    clinicName: {
      type: String,
      default: "Therapy With Harsha",
    },

    therapistName: {
      type: String,
      default: "Harsha Aman",
    },

    qualification: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    consultationFee: {
      type: Number,
      default: 800,
    },

    sessionDuration: {
      type: Number,
      default: 60,
    },

    currency: {
      type: String,
      default: "INR",
    },

    upiId: {
      type: String,
      default: "",
    },

    qrCode: {
      type: String,
      default: "",
    },

    paymentInstructions: {
      type: String,
      default:
        "Please complete the payment and click 'I Have Paid'.",
    },

    cancellationPolicy: {
      type: String,
      default: "",
    },

    refundPolicy: {
      type: String,
      default: "",
    },

    autoGenerateMeet: {
      type: Boolean,
      default: true,
    },
    qrCodeImage: {
    type: String,
    default: "",
},

consultationFee: {
    type: Number,
    default: 1000,
},

followupFee: {
    type: Number,
    default: 1000,
},

    autoEmailPatient: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ClinicSettings",
  clinicSettingsSchema
);