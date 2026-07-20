require("dotenv").config();
const nodemailer = require("nodemailer");

// ======================================
// ENV CHECK
// ======================================

console.log("EMAIL_USER:", process.env.EMAIL_USER);

console.log(
  "EMAIL_PASS length:",
  process.env.EMAIL_PASS
    ? process.env.EMAIL_PASS.length
    : "undefined"
);

// ======================================
// SMTP TRANSPORTER
// ======================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ======================================
// SEND EMAIL
// ======================================

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("====================================");
    console.log("Starting email process...");
    console.log("Recipient:", to);
    console.log("Subject:", subject);

    console.log("Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP verified successfully.");

    console.log("Sending email...");
    const info = await transporter.sendMail({
      from: `"Therapy With Harsha" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully.");
    console.log("Message ID:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("====================================");

    return true;
  } catch (err) {
    console.error("====================================");
    console.error("❌ EMAIL ERROR");
    console.error("Message:", err.message);
    console.error("Code:", err.code);
    console.error("Command:", err.command);

    if (err.response) {
      console.error("Response:", err.response);
    }

    console.error(err);
    console.error("====================================");

    // Throw the error so the controller knows email failed
    throw err;
  }
};

module.exports = {
  sendEmail,
};