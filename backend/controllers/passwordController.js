const PasswordResetOTP = require("../models/PasswordResetOTP");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// ======================================================
// Mail Transport
// ======================================================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.log("❌ Mail Transport Error");
    console.log(error);
  } else {
    console.log("✅ Mail Server Ready");
  }
});

// ======================================================
// Send OTP
// ======================================================

exports.sendOTP = async (req, res) => {
  try {
    console.log("========== SEND OTP ==========");
    console.log(req.body);

    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({
        success: false,
        message: "Email and role are required.",
      });
    }

    // Check whether user exists with this role
    const user = await User.findOne({
      email,
      role,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          role === "admin"
            ? "No therapist account found with this email."
            : "No patient account found with this email.",
      });
    }

    // Delete previous OTP
    await PasswordResetOTP.deleteMany({ email });

    // Generate OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    console.log("Generated OTP:", otp);

    // Save OTP
    await PasswordResetOTP.create({
      email,
      otp,
      attempts: 0,
      expiresAt: new Date(
        Date.now() + 10 * 60 * 1000
      ),
    });

    // Send Email
    await transporter.sendMail({
      from: `"Therapy With Harsha" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family:Arial;padding:25px">
          <h2>Password Reset Request</h2>

          <p>Your OTP is:</p>

          <h1
            style="
              color:#47685F;
              letter-spacing:8px;
            "
          >
            ${otp}
          </h1>

          <p>
            This OTP will expire in
            <strong>10 minutes</strong>.
          </p>

          <p>
            If you didn't request this,
            please ignore this email.
          </p>

          <br>

          <b>Therapy With Harsha</b>
        </div>
      `,
    });

    console.log("✅ Email Sent");

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });

  } catch (err) {

    console.log("SEND OTP ERROR");
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Unable to send OTP.",
    });

  }
};

// ======================================================
// Verify OTP
// ======================================================
// ======================================================
// Verify OTP
// ======================================================

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp, role } = req.body;

    if (!email || !otp || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and role are required.",
      });
    }

    // Check whether user exists with this role
    const user = await User.findOne({
      email,
      role,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          role === "admin"
            ? "Therapist account not found."
            : "Patient account not found.",
      });
    }

    // Find OTP
    const record = await PasswordResetOTP.findOne({ email });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    // Check expiry
    if (record.expiresAt < new Date()) {
      await PasswordResetOTP.deleteMany({ email });

      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    // Wrong OTP
    if (record.otp !== otp) {
      record.attempts += 1;
      await record.save();

      if (record.attempts >= 5) {
        await PasswordResetOTP.deleteMany({ email });

        return res.status(429).json({
          success: false,
          message:
            "Too many incorrect attempts. Please request a new OTP.",
        });
      }

      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${
          5 - record.attempts
        } attempt(s) remaining.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });

  } catch (err) {

    console.log("VERIFY OTP ERROR");
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }
};
// ======================================================
// Reset Password
// ======================================================

exports.resetPassword = async (req, res) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      role,
    } = req.body;

    // Validate input
    if (!email || !password || !confirmPassword || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Check passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // Strong password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
      });
    }

    // Check whether user exists with this role
    const user = await User.findOne({
      email,
      role,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          role === "admin"
            ? "Therapist account not found."
            : "Patient account not found.",
      });
    }

    // Check OTP
    const record = await PasswordResetOTP.findOne({
      email,
    });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Please verify OTP first.",
      });
    }

    // Check expiry
    if (record.expiresAt < new Date()) {
      await PasswordResetOTP.deleteMany({ email });

      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save password
    user.password = hashedPassword;
    await user.save();

    // Delete OTP
    await PasswordResetOTP.deleteMany({ email });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });

  } catch (err) {

    console.log("RESET PASSWORD ERROR");
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }
};