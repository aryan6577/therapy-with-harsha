require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS length:",
  process.env.EMAIL_PASS
    ? process.env.EMAIL_PASS.length
    : "undefined"
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.verify();
    console.log("SMTP connection successful.");

    await transporter.sendMail({
      from: `"Therapy With Harsha" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = {
  sendEmail,
};