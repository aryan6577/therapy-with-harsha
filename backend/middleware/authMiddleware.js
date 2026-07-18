const jwt = require("jsonwebtoken");

// ===============================
// Verify JWT Token
// ===============================
const verifyToken = (req, res, next) => {

  try {

    const token =
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  }

};

// ===============================
// Admin Only
// ===============================
const verifyAdmin = (req, res, next) => {

  if (req.user.role !== "admin") {

    return res.status(403).json({
      success: false,
      message: "Admin Access Only",
    });

  }

  next();

};

// ===============================
// Patient Only
// ===============================
const verifyPatient = (req, res, next) => {

  if (req.user.role !== "patient") {

    return res.status(403).json({
      success: false,
      message: "Patient Access Only",
    });

  }

  next();

};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyPatient,
};