const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Therapy With Harsha" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully");
    console.log(info.messageId);

    return true;
  } catch (err) {
    console.error("❌ Nodemailer Error:");
    console.error(err);
    throw err;
  }
};

module.exports = {
  sendEmail,
};