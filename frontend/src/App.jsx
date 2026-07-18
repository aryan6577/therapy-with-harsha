import AdminForgotPassword from "./pages/admin/AdminForgotPassword";
import AdminVerifyOTP from "./pages/AdminVerifyOTP";
import AdminResetPassword from "./pages/AdminResetPassword";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/admin/AdminLogin";
import Home from "./pages/Home";
import ManageHolidays from "./pages/ManageHolidays";
import SchedulingCenter from "./pages/SchedulingCenter";
import Reviews from "./pages/Reviews";
import Analytics from "./pages/Analytics";
import Login from "./pages/patient/Login";
import Register from "./pages/patient/Register";
import Dashboard from "./pages/patient/Dashboard";
import IntakeForm from "./pages/patient/IntakeForm";
import BookAppointment from "./pages/patient/BookAppointment";
import AppointmentHistory from "./pages/patient/AppointmentHistory";
import Profile from "./pages/patient/Profile";
import ProfileCompleted from "./pages/patient/ProfileCompleted";
import Payment from "./pages/patient/Payment";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import BookingSuccess from "./components/patient/booking/BookingSuccess";

import AdminDashboard from "./pages/AdminDashboard";
import ManageAvailability from "./pages/ManageAvailability";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import ClinicSettings from "./pages/ClinicSettings";
import ClinicalNotes from "./pages/ClinicalNotes";
import Appointments from "./pages/Appointments";
import AppointmentDetails from "./pages/AppointmentDetails";

import PatientRoute from "./components/auth/PatientRoute";
import AdminRoute from "./components/auth/AdminRoute";

function App() {
  return (
    <Routes>

      {/* ========================= */}
      {/* PUBLIC WEBSITE */}
      {/* ========================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ========================= */}
      {/* PATIENT ROUTES */}
      {/* ========================= */}

      <Route
        path="/intake"
        element={
          <PatientRoute>
            <IntakeForm />
          </PatientRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PatientRoute>
            <Dashboard />
          </PatientRoute>
        }
      />
    <Route
  path="/admin/scheduling"
  element={
    <AdminRoute>
      <SchedulingCenter />
    </AdminRoute>
  }
/>
      <Route
        path="/book"
        element={
          <PatientRoute>
            <BookAppointment />
          </PatientRoute>
        }
      />
      <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
<Route
  path="/verify-otp"
  element={<VerifyOTP />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>
      <Route
        path="/history"
        element={
          <PatientRoute>
            <AppointmentHistory />
          </PatientRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PatientRoute>
            <Profile />
          </PatientRoute>
        }
      />

      <Route
        path="/profile-completed"
        element={
          <PatientRoute>
            <ProfileCompleted />
          </PatientRoute>
        }
      />

      <Route
        path="/booking-success"
        element={
          <PatientRoute>
            <BookingSuccess />
          </PatientRoute>
        }
      />

      <Route
        path="/payment/:id"
        element={
          <PatientRoute>
            <Payment />
          </PatientRoute>
        }
      />
    {/* ========================= */}
{/* ADMIN LOGIN */}
{/* ========================= */}

<Route
  path="/admin/login"
  element={<AdminLogin />}
/>
<Route
  path="/admin-forgot-password"
  element={<AdminForgotPassword />}
/>

<Route
  path="/admin-verify-otp"
  element={<AdminVerifyOTP />}
/>

<Route
  path="/admin-reset-password"
  element={<AdminResetPassword />}
/>
      {/* ========================= */}
      {/* ADMIN ROUTES */}
      {/* ========================= */}

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
  path="/admin/reviews"
  element={
    <AdminRoute>
      <Reviews />
    </AdminRoute>
  }
/>

<Route
  path="/admin/analytics"
  element={
    <AdminRoute>
      <Analytics />
    </AdminRoute>
  }
/>
      
      <Route
        path="/admin/patients"
        element={
          <AdminRoute>
            <Patients />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/patients/:id"
        element={
          <AdminRoute>
            <PatientDetails />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <AdminRoute>
            <ClinicSettings />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/clinical/:appointmentId"
        element={
          <AdminRoute>
            <ClinicalNotes />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/appointments"
        element={
          <AdminRoute>
            <Appointments />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/appointments/:id"
        element={
          <AdminRoute>
            <AppointmentDetails />
          </AdminRoute>
        }
      />

    </Routes>
  );
}

export default App;