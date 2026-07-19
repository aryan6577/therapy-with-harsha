const dotenv = require("dotenv");
dotenv.config();
const adminRoutes = require("./routes/adminRoutes");
const patientRoutes = require("./routes/patientRoutes");
const express = require("express");
console.log("SERVER FILE:", __filename);
console.log("__dirname:", __dirname);
const dashboardRoutes = require("./routes/dashboardRoutes");
const holidayRoutes = require("./routes/holidayRoutes");
const blockedSlotRoutes = require(
  "./routes/blockedSlotRoutes"
);
const vacationRoutes = require("./routes/vacationRoutes");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
//const mongoSanitize = require("express-mongo-sanitize");

const hpp = require("hpp");
const passwordRoutes = require(
  "./routes/passwordRoutes"
);

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const googleRoutes = require(
"./routes/googleRoutes"
);
const connectDB = require("./config/db");
const clinicSettingsRoutes = require(
  "./routes/clinicSettingsRoutes"
);
const appointmentRoutes = require("./routes/appointmentRoutes");
const path = require("path");
const noteRoutes = require("./routes/noteRoutes");
const availabilityRoutes = require(
  "./routes/availabilityRoutes"
);
require("./services/cleanupPaymentScreenshots");
const clinicalRoutes = require(
  "./routes/clinicalRoutes"
);
dotenv.config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");
connectDB();

const app = express();
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.originalUrl);
  next();
});
// ========================================
// SECURITY
// ========================================

// Hide Express signature
app.disable("x-powered-by");

// Secure HTTP headers
app.use(helmet());

// Remove malicious MongoDB operators
//app.use(mongoSanitize());

// Remove malicious HTML/JS

// Prevent HTTP Parameter Pollution
app.use(hpp());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://therapy-with-harsha.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
// ========================================
// GLOBAL RATE LIMIT
// ========================================

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 300,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please try again after 15 minutes.",
  },
});

app.use(apiLimiter);
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
app.use(
  "/api/password",
  passwordRoutes
);
app.use("/api/auth", authRoutes);
app.use(
  "/api/vacation",
  vacationRoutes
);
app.use(
  "/api/blocked-slot",
  blockedSlotRoutes
);
app.use("/api/admin", adminRoutes);
app.use(
  "/api/settings",
  clinicSettingsRoutes
);
app.use("/api/notes", noteRoutes);
app.use(
"/api/google",
googleRoutes
);
app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});
app.use("/api/patient", patientRoutes);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.get("/", (req, res) => {
  res.send("Therapy With Harsha Backend Running");
});
app.use(
    "/api/appointment",
    appointmentRoutes
);
app.use(
  "/api/holiday",
  holidayRoutes
);
app.use(
  "/api/clinical",
  clinicalRoutes
);
app.use(
  "/api/contact",
  contactRoutes
);

app.use(
"/api/availability",
availabilityRoutes
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});