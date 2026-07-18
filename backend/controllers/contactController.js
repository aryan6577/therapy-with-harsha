const Contact = require("../models/Contact");

const {
  sendEmail,
} = require("../services/emailService");

// ======================================
// Send Contact Message
// ======================================

exports.sendContactMessage = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      phone,
      message,
    } = req.body;

    // ==========================
    // Validation
    // ==========================

    if (
      !name ||
      !email ||
      !phone ||
      !message
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Please fill all fields.",

      });

    }

    // ==========================
    // Save to MongoDB
    // ==========================

    const contact =
      await Contact.create({

        name,

        email,

        phone,

        message,

      });

    // ==========================
    // Email to Harsha
    // ==========================

    await sendEmail({

      to: process.env.EMAIL_USER,

      subject:
        "🔔 New Contact Request - Therapy With Harsha",

      html: `

      <div style="font-family:Arial;padding:25px">

      <h2 style="color:#47685F;">
      New Contact Form Submission
      </h2>

      <hr>

      <p><strong>Name:</strong> ${name}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Phone:</strong> ${phone}</p>

      <p><strong>Message:</strong></p>

      <div
      style="
      background:#F8F8F8;
      padding:15px;
      border-radius:8px;
      ">

      ${message}

      </div>

      <br>

      <p>
      Therapy With Harsha Website
      </p>

      </div>

      `,

    });

    // ==========================
    // Auto Reply
    // ==========================

    await sendEmail({

      to: email,

      subject:
        "Thank You for Contacting Therapy With Harsha",

      html: `

      <div
      style="
      font-family:Arial;
      padding:30px;
      ">

      <h2
      style="
      color:#47685F;
      ">

      Thank You!

      </h2>

      <p>

      Dear <strong>${name}</strong>,

      </p>

      <p>

      Thank you for contacting
      <strong>Therapy With Harsha</strong>.

      </p>

      <p>

      Your message has been received
      successfully.

      </p>

      <p>

      Harsha will review your query
      and get back to you as soon as
      possible.

      </p>

      <br>

      <p>

      Warm Regards,

      </p>

      <strong>

      Therapy With Harsha

      </strong>

      </div>

      `,

    });

    // ==========================

    res.status(201).json({

      success: true,

      message:
        "Message sent successfully.",

      contact,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message:
        "Something went wrong.",

    });

  }

};