const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Resend Error:", error);
      throw error;
    }

    console.log("✅ Email sent successfully");
    console.log(data);

    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  sendEmail,
};