const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Counter = require("../models/Counter");
const { validationResult } = require("express-validator");

// ===============================================
// Generate Unique Patient ID
// ===============================================

const generatePatientId = async () => {
  let counter = await Counter.findOne({
    name: "patientId",
  });

  if (!counter) {
    counter = await Counter.create({
      name: "patientId",
      sequence: 1,
    });
  } else {
    counter.sequence += 1;
    await counter.save();
  }

  return `TWH-26${String(counter.sequence).padStart(4, "0")}`;
};

// ===============================================
// Register
// ===============================================

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      fullName,
      email,
      phone,
      password,
    } = req.body;

    const existing = await User.findOne({
      email,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const patientId =
      await generatePatientId();

    const user = await User.create({
      patientId,
      fullName,
      email,
      phone,
      password: hashedPassword,
      role: "patient",
    });

    return res.status(201).json({
      success: true,
      message: "Registration Successful.",
      user: {
        _id: user._id,
        patientId: user.patientId,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (err) {

    console.error("Register Error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }
};

// ===============================================
// Login
// ===============================================

exports.login = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    let user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!user.patientId) {
      user.patientId =
        await generatePatientId();

      await user.save();
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      success: true,
      message: "Login Successful.",
      token,
      user: {
        _id: user._id,
        patientId: user.patientId,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (err) {

    console.error("Login Error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }

};

// ===============================================
// Get Logged In User
// ===============================================

exports.getMe = async (req, res) => {

  try {

    const user =
      await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.json({
      success: true,
      user: {
        _id: user._id,
        patientId: user.patientId,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (err) {

    console.error("Get Me Error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }

};