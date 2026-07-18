const cron = require("node-cron");
const Appointment = require("../models/Appointment");
const cloudinary = require("../config/cloudinary");

// Runs every day at 2:00 AM
cron.schedule("0 2 * * *", async () => {

  console.log("🧹 Running Payment Screenshot Cleanup...");

  try {

    const twentyDaysAgo = new Date();

    twentyDaysAgo.setDate(
      twentyDaysAgo.getDate() - 20
    );

    const appointments =
  await Appointment.find({

    paymentStatus: "Paid",

    paymentSubmittedAt: {
      $lte: twentyDaysAgo,
    },

    paymentScreenshotPublicId: {
      $ne: "",
    },

  });

    console.log(
      `Found ${appointments.length} screenshot(s) eligible for deletion.`
    );

  let checked = appointments.length;
let deleted = 0;
let failed = 0;

for (const appointment of appointments) {

  try {

    const result = await cloudinary.uploader.destroy(
      appointment.paymentScreenshotPublicId
    );

    if (result.result === "ok") {

      appointment.paymentScreenshot = "";
appointment.paymentScreenshotPublicId = "";
appointment.paymentSubmittedAt = null;
appointment.paymentHistory.push({
  action: "Payment Screenshot Deleted Automatically",
  by: "System",
  date: new Date(),
  remarks: "Deleted automatically after 20 days.",
});
      await appointment.save();

      deleted++;

      console.log(
        `✅ Deleted screenshot for Appointment ${appointment.appointmentId}`
      );

    } else {

      failed++;

      console.log(
        `❌ Cloudinary refused deletion for Appointment ${appointment.appointmentId}`
      );

    }

  }

  catch (err) {

    failed++;

    console.log(
      `❌ Failed deleting screenshot for Appointment ${appointment.appointmentId}`
    );

    console.log(err.message);

  }

}
console.log("");

console.log("====================================");
console.log("PAYMENT SCREENSHOT CLEANUP REPORT");
console.log("====================================");

console.log("Checked :", checked);
console.log("Deleted :", deleted);
console.log("Failed  :", failed);

console.log(
  "Completed At :",
  new Date().toLocaleString()
);

console.log("====================================");

console.log("");

  }

  catch (err) {

    console.log(
      "Cleanup Job Error:"
    );

    console.log(err);

  }

});