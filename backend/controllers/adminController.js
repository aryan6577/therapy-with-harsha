const User = require("../models/User");
const PatientProfile = require("../models/PatientProfile");
const Appointment = require("../models/Appointment");
const ClinicalNote = require("../models/ClinicalNote");
const cloudinary = require("../config/cloudinary");

// We'll use this in the next step
let googleCalendarService = null;

try {
  googleCalendarService = require("../services/googleCalendarService");
} catch (err) {
  console.log("Google Calendar service not found. Skipping calendar deletion.");
}

// ======================================================
// Get All Patients
// ======================================================

exports.getAllPatients = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const patients = await Promise.all(
      users.map(async (user) => {
        const profile = await PatientProfile.findOne({
          user: user._id,
        });

        const appointments =
          await Appointment.countDocuments({
            patient: user._id,
          });

        return {
          user,
          profile,
          totalAppointments: appointments,
        };
      })
    );

    res.json({
      success: true,
      patients,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================================
// Get Single Patient
// ======================================================

exports.getPatient = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    ).select("-password");

    const profile =
      await PatientProfile.findOne({
        user: req.params.id,
      });

    const appointments =
      await Appointment.find({
        patient: req.params.id,
      }).sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      user,
      profile,
      appointments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================================
// Search Patients
// ======================================================

exports.searchPatients = async (req, res) => {
  try {
    const query = req.query.q || "";

    const users = await User.find({
      $or: [
        {
          fullName: {
            $regex: query,
            $options: "i",
          },
        },
        {
          email: {
            $regex: query,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: query,
            $options: "i",
          },
        },
        {
          patientId: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    }).select("-password");

    const patients = await Promise.all(
      users.map(async (user) => {
        const profile =
          await PatientProfile.findOne({
            user: user._id,
          });

        const appointments =
          await Appointment.find({
            patient: user._id,
          });

        return {
          user,
          profile,
          totalAppointments:
            appointments.length,
        };
      })
    );

    res.json({
      success: true,
      patients,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================================
// Dashboard Statistics
// ======================================================

exports.getDashboardStats = async (req, res) => {
  try {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    const totalPatients =
      await User.countDocuments({
        role: "patient",
      });

    const pendingRequests =
      await Appointment.countDocuments({
        status: "Pending",
      });

    const todaysAppointments =
      await Appointment.countDocuments({
        appointmentDate: today,
        status: "Approved",
      });

    const sessionsThisMonth =
      await Appointment.countDocuments({
        status: "Completed",
      });

    res.json({
      success: true,
      stats: {
        todaysAppointments,
        pendingRequests,
        totalPatients,
        sessionsThisMonth,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.deletePatientRecord = async (req, res) => {

  try {

    const { patientId } = req.params;

    const patient = await User.findById(patientId);

    if (!patient) {

      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });

    }

    // ==========================================
    // Get all appointments
    // ==========================================

    const appointments = await Appointment.find({
      patient: patientId,
    });

    // ==========================================
    // Delete Cloudinary Images
    // Delete Google Calendar Events
    // ==========================================

    for (const appointment of appointments) {

      // -----------------------------
      // Payment Screenshot
      // -----------------------------

      if (appointment.paymentScreenshotPublicId) {

        try {

          await cloudinary.uploader.destroy(
            appointment.paymentScreenshotPublicId
          );

          console.log(
            `Deleted screenshot : ${appointment.appointmentId}`
          );

        } catch (err) {

          console.log(
            "Cloudinary Delete Failed:",
            err.message
          );

        }

      }

      // -----------------------------
      // Google Calendar Event
      // -----------------------------

      if (
        googleCalendarService &&
        appointment.calendarEventId
      ) {

        try {

          if (
            googleCalendarService.deleteEvent
          ) {

            await googleCalendarService.deleteEvent(
              appointment.calendarEventId
            );

          }

          console.log(
            `Deleted Google Calendar Event : ${appointment.appointmentId}`
          );

        } catch (err) {

          console.log(
            "Calendar Delete Failed:",
            err.message
          );

        }

      }

    }

    // ==========================================
    // Delete Clinical Notes
    // ==========================================

    await ClinicalNote.deleteMany({

      appointment: {

        $in: appointments.map(
          appointment => appointment._id
        ),

      },

    });

    // ==========================================
    // Delete Appointments
    // ==========================================

    await Appointment.deleteMany({

      patient: patientId,

    });

    // ==========================================
    // Delete Patient Profile
    // ==========================================

    await PatientProfile.deleteOne({

      user: patientId,

    });

    // ==========================================
    // Delete User
    // ==========================================

    await User.findByIdAndDelete(
      patientId
    );

    return res.json({

      success: true,

      message:
        "Patient record deleted successfully.",

    });

  }

  catch (err) {

    console.log(err);

    return res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};