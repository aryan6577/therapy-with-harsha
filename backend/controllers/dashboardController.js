const Appointment = require("../models/Appointment");
const User = require("../models/User");

// =====================================
// Dashboard Statistics
// =====================================

exports.getDashboard = async (req, res) => {

  try {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    // ==========================
    // Patients
    // ==========================

    const totalPatients =
      await User.countDocuments({
        role: "patient",
      });

    // ==========================
    // Pending Queue
    // ==========================

    const pendingQueue =
      await Appointment.countDocuments({

        status: "Pending",

      });

    // ==========================
    // Today's Sessions
    // ==========================

    const todaySessions =
      await Appointment.countDocuments({

        appointmentDate: today,

        status: {
          $in: [
            "Approved",
            "Completed",
          ],
        },

      });

    // ==========================
    // Pending Payments
    // ==========================

    const pendingPayments =
      await Appointment.countDocuments({

        paymentStatus: "Submitted",

      });

    // ==========================
    // Completed
    // ==========================

    const completed =
      await Appointment.countDocuments({

        status: "Completed",

      });

    // ==========================
    // Revenue
    // ==========================

    const paidAppointments =
      await Appointment.find({

        paymentStatus: "Paid",

      });

    const revenue =
      paidAppointments.reduce(

        (sum, item) =>

          sum +
          (item.paymentAmount || 0),

        0

      );

    res.json({

      success: true,

      dashboard: {

        totalPatients,

        todaySessions,

        pendingQueue,

        pendingPayments,

        completed,

        revenue,

      },

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};