const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const result =
      await brevo.transactionalEmails.sendTransacEmail({
        sender: {
          name: "Therapy With Harsha",
          email: process.env.ADMIN_EMAIL,
        },

        to: [
          {
            email: to,
          },
        ],

        subject,

        htmlContent: html,
      });

    console.log("✅ Email sent successfully");
    console.log(result);

    return true;
  } catch (err) {
    console.error("❌ Brevo API Error");

    if (err.response) {
      console.error(err.response);
    } else {
      console.error(err);
    }

    throw err;
  }
};

module.exports = {
  sendEmail,
};