const express = require("express");

const router = express.Router();

const upload = require("../middleware/paymentUpload");

const {
  verifyToken,
  verifyAdmin,
  verifyPatient,
} = require("../middleware/authMiddleware");

const {
  bookAppointment,
  getAppointments,
  getAppointment,
  approveAppointment,
  rejectAppointment,
  rescheduleAppointment,
  completeAppointment,
  verifyPayment,
  rejectPayment,
  cancelAppointment,
  getBookedSlots,
  submitPayment,
} = require("../controllers/appointmentController");

// ===================================
// Patient Routes
// ===================================

// Book Appointment
router.post(
  "/book",
  verifyToken,
  verifyPatient,
  bookAppointment
);

// Submit Payment Screenshot
router.post(
  "/submit-payment/:id",
  verifyToken,
  verifyPatient,
  upload.single("paymentScreenshot"),
  submitPayment
);

// ===================================
// Shared Routes (Logged-in Users)
// ===================================

// Get All Appointments
router.get(
  "/",
  verifyToken,
  getAppointments
);

// Get Single Appointment
router.get(
  "/:id",
  verifyToken,
  getAppointment
);

// Booked Slots
// (No login required because patients need to see
// available slots before booking.)
router.get(
  "/booked-slots/:date",
  getBookedSlots
);

// ===================================
// Therapist/Admin Routes
// ===================================

// Approve Appointment
router.put(
  "/approve/:id",
  verifyToken,
  verifyAdmin,
  approveAppointment
);

// Reject Appointment
router.put(
  "/reject/:id",
  verifyToken,
  verifyAdmin,
  rejectAppointment
);

// Reschedule Appointment
router.put(
  "/reschedule/:id",
  verifyToken,
  verifyAdmin,
  rescheduleAppointment
);

// Complete Appointment
router.put(
  "/complete/:id",
  verifyToken,
  verifyAdmin,
  completeAppointment
);

// Cancel Appointment
router.put(
  "/cancel/:id",
  verifyToken,
  verifyAdmin,
  cancelAppointment
);

// Verify Payment
router.put(
  "/verify-payment/:id",
  verifyToken,
  verifyAdmin,
  verifyPayment
);
router.put(
  "/reject-payment/:id",
  verifyToken,
  verifyAdmin,
  rejectPayment
);
module.exports = router;