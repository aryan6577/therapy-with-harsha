const Appointment = require("../models/Appointment");
const Counter = require("../models/Counter");
const User = require("../models/User");
const ClinicSettings = require("../models/ClinicSettings");

const {
  sendEmail,
} = require("../services/emailService");

const {
  createGoogleMeet,
} = require("../services/googleCalendarService");

// ===================================================
// Generate Appointment ID
// ===================================================

const generateAppointmentId = async () => {

  const year = new Date()
    .getFullYear()
    .toString()
    .slice(-2);

  let counter =
    await Counter.findOne({
      name: "appointmentId",
    });

  if (!counter) {

    counter =
      await Counter.create({

        name: "appointmentId",

        sequence: 1,

      });

  }

  else {

    counter.sequence += 1;

    await counter.save();

  }

  return `APT-${year}${String(
    counter.sequence
  ).padStart(4, "0")}`;

};

// ===================================================
// BOOK APPOINTMENT
// ===================================================

exports.bookAppointment = async (
  req,
  res
) => {

  try {

    // Logged in patient
    const patient = req.user.id;

    const {

      patientProfile,

      appointmentDate,

      appointmentTime,

      appointmentType,

      sessionType,

      concern,

    } = req.body;
        // ==========================================
    // Validation
    // ==========================================

    if (
      !appointmentDate ||
      !appointmentTime
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all required fields.",
      });
    }

    // ==========================================
    // Check Slot Availability
    // ==========================================

    const existingSlot =
      await Appointment.findOne({

        appointmentDate,

        appointmentTime,

        status: {
          $in: [
            "Pending",
            "Approved",
            "Rescheduled",
          ],
        },

      });

    if (existingSlot) {

      return res.status(400).json({

        success: false,

        message:
          "This slot has already been booked.",

      });

    }

    // ==========================================
    // Prevent Multiple Active Appointments
    // ==========================================

    const activeAppointment =
      await Appointment.findOne({

        patient,

        status: {
          $in: [
            "Pending",
            "Approved",
            "Rescheduled",
          ],
        },

      });

    if (activeAppointment) {

      return res.status(400).json({

        success: false,

        message:
          "You already have an active appointment. Please complete or cancel your current appointment before booking another session.",

      });

    }

    // ==========================================
    // Generate Appointment ID
    // ==========================================

    const appointmentId =
      await generateAppointmentId();

    // ==========================================
    // Load Clinic Settings
    // ==========================================

    const settings =
      await ClinicSettings.findOne();
          // ==========================================
    // Create Appointment
    // ==========================================

    const appointment =
      await Appointment.create({

        appointmentId,

        patient,

        patientProfile,

        therapist:
          settings?.therapistName ||
          "Harsha Aman",

        appointmentDate,

        appointmentTime,

        appointmentDuration:
          settings?.sessionDuration ||
          60,

        paymentAmount:
          settings?.consultationFee ||
          1000,

        appointmentType,

        sessionType,

        concern,

        paymentStatus: "Pending",

        paymentSubmitted: false,

        status: "Pending",

      });
      const patientDetails = await User.findById(patient);
    // ==========================================
    // Success Response
    // ==========================================
    // ======================================
// Email to Patient
// ======================================

await sendEmail({

  to: patientDetails.email,

  subject: "Appointment Request Received | Therapy With Harsha",

  html: `

<h2>Appointment Request Received</h2>

<p>Hello ${patientDetails.fullName},</p>

<p>

Your appointment request has been received successfully.

</p>

<p>

Appointment ID :
<b>${appointment.appointmentId}</b>

</p>

<p>

Date :
<b>${appointment.appointmentDate}</b>

</p>

<p>

Time :
<b>${appointment.appointmentTime}</b>

</p>

<p>

Your appointment is currently waiting for approval by Harsha.

</p>

<p>

Once approved, you will receive another email asking you to complete the payment.

</p>

`

});
// ======================================
// Notify Harsha
// ======================================

await sendEmail({

  to: "therapy.harsha@gmail.com",

  subject: `New Appointment Request - ${patientDetails.fullName}`,

  html: `

<h2>New Appointment Request</h2>

<p>

A new appointment has been booked.

</p>

<p>

<b>Patient :</b>
${patientDetails.fullName}

</p>

<p>

<b>Email :</b>
${patientDetails.email}

</p>

<p>

<b>Appointment ID :</b>
${appointment.appointmentId}

</p>

<p>

<b>Date :</b>
${appointment.appointmentDate}

</p>

<p>

<b>Time :</b>
${appointment.appointmentTime}

</p>

<p>

Please login to your dashboard to approve or reject this appointment.

</p>

`

});
    return res.status(201).json({

      success: true,

      message:
        "Appointment request submitted successfully.",

      appointment,

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }

};
// ===================================================
// Get All Appointments
// ===================================================

exports.getAppointments = async (
  req,
  res
) => {

  try {

    let appointments = [];

    // ==========================================
    // Admin -> See All Appointments
    // ==========================================

    if (req.user.role === "admin") {

      appointments =
        await Appointment.find()

          .populate(
            "patient",
            "-password"
          )

          .populate(
            "patientProfile"
          )

          .sort({
            createdAt: -1,
          });

    }

    // ==========================================
    // Patient -> Only Own Appointments
    // ==========================================

    else {

      appointments =
        await Appointment.find({

          patient: req.user.id,

        })

          .populate(
            "patient",
            "-password"
          )

          .populate(
            "patientProfile"
          )

          .sort({
            createdAt: -1,
          });

    }

    return res.json({

      success: true,

      appointments,

    });

  }

  catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }

};

// ===================================================
// Get Single Appointment
// ===================================================

exports.getAppointment = async (
  req,
  res
) => {

  try {

    const appointment =
      await Appointment.findById(
        req.params.id
      )

        .populate(
          "patient",
          "-password"
        )

        .populate(
          "patientProfile"
        );

    if (!appointment) {

      return res.status(404).json({

        success: false,

        message:
          "Appointment not found.",

      });

    }

    // =====================================
    // Patient Security Check
    // =====================================

    if (

      req.user.role ===
        "patient" &&

      appointment.patient._id.toString() !==
        req.user.id

    ) {

      return res.status(403).json({

        success: false,

        message:
          "Access Denied.",

      });

    }

    return res.json({

      success: true,

      appointment,

    });

  }

  catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }

};
// ===================================================
// Approve Appointment
// ===================================================

exports.approveAppointment = async (
  req,
  res
) => {

  try {

    const appointment =
      await Appointment.findById(
        req.params.id
      );

    if (!appointment) {

      return res.status(404).json({

        success: false,

        message:
          "Appointment not found.",

      });

    }

    if (
      appointment.status === "Cancelled"
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Cancelled appointments cannot be approved.",
      });

    }

    appointment.status = "Approved";

    appointment.approvedAt =
      new Date();

    appointment.approvedBy =
      "Harsha Aman";

    await appointment.save();
    const patient = await User.findById(
  appointment.patient
);

const settings =
  await ClinicSettings.findOne();
  // ======================================
// Email Patient - Appointment Approved
// ======================================

await sendEmail({

  to: patient.email,

  subject:
    "Appointment Approved | Therapy With Harsha",

  html: `

<div style="
font-family:Arial;
max-width:650px;
margin:auto;
padding:30px;
border:1px solid #ddd;
border-radius:10px;
">

<h2 style="color:#47685F;">
Appointment Approved
</h2>

<p>

Hello
<b>${patient.fullName}</b>,

</p>

<p>

Your appointment request has been approved by Harsha.

</p>

<hr>

<h3>Appointment Details</h3>

<p>

<b>Appointment ID:</b>

${appointment.appointmentId}

</p>

<p>

<b>Date:</b>

${appointment.appointmentDate}

</p>

<p>

<b>Time:</b>

${appointment.appointmentTime}

</p>

<p>

<b>Consultation Fee:</b>

₹ ${appointment.paymentAmount}

</p>

<hr>

<p>

Please complete your payment to confirm your booking.

</p>

<p>

After payment verification you will automatically receive your Google Meet link.

</p>

<p>

Thank you,

<br>

<b>Therapy With Harsha</b>

</p>

</div>

`

});

    return res.json({

      success: true,

      message:
        "Appointment approved successfully.",

      appointment,

    });

  }

  catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }

};

// ===================================================
// Reject Appointment
// ===================================================

exports.rejectAppointment = async (
  req,
  res
) => {

  try {

    const appointment =
      await Appointment.findById(
        req.params.id
      );

    if (!appointment) {

      return res.status(404).json({

        success: false,

        message:
          "Appointment not found.",

      });

    }

    appointment.status = "Rejected";

    appointment.rejectionReason =
      req.body.reason || "";

    await appointment.save();
    const patient = await User.findById(
  appointment.patient
);

await sendEmail({

  to: patient.email,

  subject:
    "Appointment Request Rejected",

  html: `

<h2>Appointment Rejected</h2>

<p>

Hello ${patient.fullName},

</p>

<p>

Unfortunately your appointment request has been rejected.

</p>

<p>

Reason:

<b>${appointment.rejectionReason}</b>

</p>

<p>

You may book another appointment from the website.

</p>

`

});

    return res.json({

      success: true,

      message:
        "Appointment rejected successfully.",

      appointment,

    });

  }

  catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }

};

// ===================================================
// Reschedule Appointment
// ===================================================

exports.rescheduleAppointment =
  async (req, res) => {

    try {

      const appointment =
        await Appointment.findById(
          req.params.id
        );

      if (!appointment) {

        return res.status(404).json({

          success: false,

          message:
            "Appointment not found.",

        });

      }

      if (
        appointment.status === "Completed"
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Completed appointments cannot be rescheduled.",
        });

      }

      appointment.status =
        "Rescheduled";

      appointment.rescheduleDate =
        req.body.date;

      appointment.rescheduleTime =
        req.body.time;

      await appointment.save();
      const patient = await User.findById(
  appointment.patient
);

await sendEmail({

  to: patient.email,

  subject:
    "Appointment Rescheduled",

  html: `

<h2>Appointment Rescheduled</h2>

<p>

Hello ${patient.fullName},

</p>

<p>

Your appointment has been rescheduled.

</p>

<p>

<b>New Date:</b>

${appointment.rescheduleDate}

</p>

<p>

<b>New Time:</b>

${appointment.rescheduleTime}

</p>

<p>

Please attend according to the updated schedule.

</p>

`

});
      return res.json({

        success: true,

        message:
          "Appointment rescheduled successfully.",

        appointment,

      });

    }

    catch (err) {

      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });

    }

};

// ===================================================
// Complete Appointment
// ===================================================

exports.completeAppointment =
  async (req, res) => {

    try {

      const appointment =
        await Appointment.findById(
          req.params.id
        );

      if (!appointment) {

        return res.status(404).json({

          success: false,

          message:
            "Appointment not found.",

        });

      }

      if (
        appointment.status === "Cancelled"
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Cancelled appointments cannot be completed.",
        });

      }

      appointment.status =
        "Completed";

      appointment.completedAt =
        new Date();

      await appointment.save();

      return res.json({

        success: true,

        message:
          "Appointment marked as completed.",

        appointment,

      });

    }

    catch (err) {

      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });

    }

};

// ===================================================
// Cancel Appointment
// ===================================================

exports.cancelAppointment =
  async (req, res) => {

    try {

      const appointment =
        await Appointment.findById(
          req.params.id
        );

      if (!appointment) {

        return res.status(404).json({

          success: false,

          message:
            "Appointment not found.",

        });

      }

      appointment.status =
        "Cancelled";

      appointment.cancelledAt =
        new Date();

      await appointment.save();

      return res.json({

        success: true,

        message:
          "Appointment cancelled successfully.",

        appointment,

      });

    }

    catch (err) {

      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });

    }

};
// ===================================================
// Get Booked Slots
// ===================================================

exports.getBookedSlots = async (
  req,
  res
) => {

  try {

    const appointments =
      await Appointment.find({

        appointmentDate:
          req.params.date,

        status: {
          $in: [
            "Pending",
            "Approved",
            "Completed",
            "Rescheduled",
          ],
        },

      });

    const bookedSlots =
      appointments.map(

        (appointment) =>
          appointment.appointmentTime

      );

    return res.json({

      success: true,

      bookedSlots,

    });

  }

  catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }

};

// ===================================================
// Verify Payment
// ===================================================

exports.verifyPayment =
  async (req, res) => {

    try {

      const appointment =
        await Appointment.findById(
          req.params.id
        )

        .populate("patient");

      if (!appointment) {

        return res.status(404).json({

          success: false,

          message:
            "Appointment not found.",

        });

      }

      if (appointment.paymentStatus === "Paid") {

        return res.status(400).json({
          success: false,
          message: "Payment has already been verified.",
        });

      }

      // ======================================
      // Generate Google Meet
      // ======================================

      const meet =
        await createGoogleMeet({

          patientName:
            appointment.patient.fullName,

          patientEmail:
            appointment.patient.email,

          appointmentDate:
            appointment.appointmentDate,

          appointmentTime:
            appointment.appointmentTime,

          duration:
            appointment.appointmentDuration,

        });

      if (!meet.success) {

        return res.status(500).json({

          success: false,

          message:
            "Unable to generate Google Meet link.",

        });

      }

      // ======================================
      // Update Appointment
      // ======================================

      appointment.paymentStatus =
        "Paid";

      appointment.paymentSubmitted =
        true;

      appointment.paymentVerifiedAt =
        new Date();

      appointment.paymentVerifiedBy =
        "Harsha Aman";

      appointment.googleMeetLink =
        meet.meetLink;

      appointment.calendarEventId =
        meet.eventId;

      await appointment.save();
            // ======================================
      // Send Confirmation Email
      // ======================================

      await sendEmail({

        to: appointment.patient.email,

        subject:
          "Appointment Confirmed | Therapy With Harsha",

        html: `

<div style="
font-family:Arial,sans-serif;
max-width:650px;
margin:auto;
padding:30px;
background:#ffffff;
border-radius:12px;
border:1px solid #e5e5e5;
">

<h2 style="color:#47685F;">
Therapy With Harsha
</h2>

<p>
Dear <b>${appointment.patient.fullName}</b>,
</p>

<p>

Your payment has been verified successfully.

Your appointment has now been confirmed.

</p>

<hr>

<h3>Appointment Details</h3>

<p>

<b>Date :</b>

${appointment.appointmentDate}

</p>

<p>

<b>Time :</b>

${appointment.appointmentTime}

</p>

<p>

<b>Session Type :</b>

${appointment.sessionType}

</p>

<p>

<b>Therapist :</b>

Harsha Aman

</p>

<hr>

<p>

Click below to join your online session.

</p>

<a
href="${meet.meetLink}"
style="
display:inline-block;
background:#47685F;
padding:14px 24px;
color:white;
text-decoration:none;
border-radius:8px;
font-weight:bold;
"

>

Join Google Meet

</a>

<br><br>

<p>

If the button does not work, use this link:

</p>

<p>

${meet.meetLink}

</p>

<hr>

<p>

Regards,

<br>

<b>Therapy With Harsha</b>

</p>

</div>

        `,

      });
      // ======================================
// Notify Harsha
// ======================================

await sendEmail({

  to: "therapy.harsha@gmail.com",

  subject:
    `New Appointment Confirmed - ${appointment.patient.fullName}`,

  html: `

<div style="
font-family:Arial,sans-serif;
max-width:700px;
margin:auto;
padding:30px;
border:1px solid #E5E5E5;
border-radius:12px;
">

<h2 style="color:#47685F;">
New Appointment Confirmed
</h2>

<p>

Hello Harsha,

</p>

<p>

A patient's payment has been verified.

The appointment is now confirmed.

</p>

<hr>

<h3>Patient Details</h3>

<p>

<b>Name:</b>

${appointment.patient.fullName}

</p>

<p>

<b>Email:</b>

${appointment.patient.email}

</p>

<p>

<b>Appointment ID:</b>

${appointment.appointmentId}

</p>

<p>

<b>Date:</b>

${appointment.appointmentDate}

</p>

<p>

<b>Time:</b>

${appointment.appointmentTime}

</p>

<p>

<b>Session:</b>

${appointment.sessionType}

</p>

<hr>

<h3>Google Meet</h3>

<p>

<a
href="${meet.meetLink}"
style="
display:inline-block;
padding:14px 22px;
background:#47685F;
color:white;
text-decoration:none;
border-radius:8px;
font-weight:bold;
">

Join Google Meet

</a>

</p>

<p>

${meet.meetLink}

</p>

<hr>

<p>

Regards,

<br>

Therapy With Harsha Website

</p>

</div>

`

});

      return res.json({

        success: true,

        message:
          "Payment verified successfully.",

        appointment,

        meetLink:
          meet.meetLink,

      });

    }

    catch (err) {

      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });

    }

};

// ===================================================
// Submit Payment
// ===================================================

exports.submitPayment =
  async (req, res) => {

    try {

      const appointment =
        await Appointment.findById(
          req.params.id
        );

      if (!appointment) {

        return res.status(404).json({

          success: false,

          message:
            "Appointment not found.",

        });

      }

      if (
        appointment.paymentSubmitted
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Payment has already been submitted.",
        });

      }
      console.log("========== SUBMIT PAYMENT ==========");
console.log("BODY:", req.body);
console.log("FILE:", req.file);
console.log("====================================");
      appointment.transactionId =
        req.body.transactionId;

      appointment.paymentSubmitted =
        true;

      appointment.paymentSubmittedAt =
        new Date();

      appointment.paymentStatus =
        "Submitted";

      if (req.file) {

        appointment.paymentScreenshot =
          req.file.path;

      }

      await appointment.save();
      const patient = await User.findById(
  appointment.patient
);
// ======================================
// Notify Harsha
// ======================================

await sendEmail({

  to: "therapy.harsha@gmail.com",

  subject:
    `Payment Submitted - ${patient.fullName}`,

  html: `

<div style="
font-family:Arial;
max-width:650px;
margin:auto;
padding:30px;
border:1px solid #ddd;
border-radius:10px;
">

<h2 style="color:#47685F;">
Payment Submitted
</h2>

<p>

Hello Harsha,

</p>

<p>

A patient has submitted payment.

</p>

<hr>

<p>

<b>Name:</b>

${patient.fullName}

</p>

<p>

<b>Email:</b>

${patient.email}

</p>

<p>

<b>Appointment ID:</b>

${appointment.appointmentId}

</p>

<p>

<b>Date:</b>

${appointment.appointmentDate}

</p>

<p>

<b>Time:</b>

${appointment.appointmentTime}

</p>

<p>

<b>Transaction ID:</b>

${appointment.transactionId || "Not Provided"}

</p>

<p>

Please login to your dashboard to verify the payment screenshot.

</p>

</div>

`

});
            return res.json({

        success: true,

        message:
          "Payment submitted successfully.",

        appointment,

      });

    }

    catch (err) {

      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });

    }

};