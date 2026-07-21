const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;

    sendSmtpEmail.sender = {
      name: "Therapy With Harsha",
      email: "therapy.harsha@gmail.com",
    };

    sendSmtpEmail.to = [
      {
        email: to,
      },
    ];

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email sent successfully");
    console.log(result.body);

    return true;
  } catch (err) {
    console.error("❌ Brevo API Error");

    if (err.response) {
      console.error(err.response.text || err.response.body);
    } else {
      console.error(err);
    }

    throw err;
  }
};

module.exports = {
  sendEmail,
};