const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      unique: true,
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    patientProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientProfile",
      default: null,
    },

    therapist: {
      type: String,
      default: "Harsha Aman",
    },

    appointmentDate: {
      type: String,
      required: true,
    },

    appointmentTime: {
      type: String,
      required: true,
    },

    appointmentDuration: {
      type: Number,
      default: 60,
    },

    appointmentType: {
      type: String,
      enum: [
        "Initial Consultation",
        "Follow-up",
        "Couple Therapy",
        "Family Therapy",
      ],
      default: "Initial Consultation",
    },

    sessionType: {
      type: String,
      enum: ["Online", "Offline"],
      default: "Online",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Completed",
        "Cancelled",
        "Rescheduled",
      ],
      default: "Pending",
    },

    // ==========================
    // PAYMENT DETAILS
    // ==========================

    paymentStatus: {
  type: String,
  enum: [
    "Pending",
    "Submitted",
    "Paid",
    "Rejected",
    "Refunded",
  ],
  default: "Pending",
}, 

    paymentAmount: {
      type: Number,
      default: 1000,
    },

    paymentSubmitted: {
      type: Boolean,
      default: false,
    },

    transactionId: {
      type: String,
      default: "",
    },

    paymentScreenshot: {
      type: String,
      default: "",
    },

    paymentSubmittedAt: Date,

    paymentVerifiedAt: Date,

    paymentVerifiedBy: {
      type: String,
      default: "",
    },

    // ==========================
    // GOOGLE MEET
    // ==========================

    googleMeetLink: {
      type: String,
      default: "",
    },

    calendarEventId: {
      type: String,
      default: "",
    },
    // ==========================
// LOCKED CONSULTATION FEE
// ==========================

lockedConsultationFee: {
  type: Number,
  default: 1000,
},

// ==========================
// CLOUDINARY
// ==========================

paymentScreenshotPublicId: {
  type: String,
  default: "",
},

// ==========================
// PAYMENT AUDIT
// ==========================

paymentRejectedAt: Date,

paymentRejectedBy: {
  type: String,
  default: "",
},

paymentRejectReason: {
  type: String,
  default: "",
},

// ==========================
// PAYMENT HISTORY
// ==========================

paymentHistory: [
  {
    action: String,
    by: String,
    date: Date,
    remarks: String,
  },
],
    // ==========================
    // APPROVAL
    // ==========================

    approvedAt: Date,

    approvedBy: {
      type: String,
      default: "",
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    rescheduleDate: {
      type: String,
      default: "",
    },

    rescheduleTime: {
      type: String,
      default: "",
    },

    completedAt: Date,

    cancelledAt: Date,

    therapistNotes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema
);