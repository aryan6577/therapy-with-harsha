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
// BREVO SMTP TRANSPORTER
// ======================================

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ======================================
// VERIFY CONNECTION ON SERVER START
// ======================================

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Brevo SMTP Connection Failed");
    console.error(error);
  } else {
    console.log("✅ Brevo SMTP Connected Successfully");
  }
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

    const info = await transporter.sendMail({
      from: '"Therapy With Harsha" <therapy.harsha@gmail.com>',
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

    throw err;
  }
};

module.exports = {
  sendEmail,
};