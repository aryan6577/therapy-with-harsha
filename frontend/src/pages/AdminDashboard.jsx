import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

import AdminLayout from "../components/admin/AdminLayout";

import DashboardStats from "../components/admin/dashboard/DashboardStats";
import PendingQueue from "../components/admin/dashboard/PendingQueue";
import TodaysSchedule from "../components/admin/dashboard/TodaysSchedule";
import PaymentQueue from "../components/admin/dashboard/PaymentQueue";
import RecentPatients from "../components/admin/dashboard/RecentPatients";

import Toast from "../components/common/Toast";
import ConfirmModal from "../components/common/ConfirmModal";
import RejectModal from "../components/common/RejectModal";
import RescheduleModal from "../components/common/RescheduleModal";

function AdminDashboard() {

  const [appointments, setAppointments] =
    useState([]);

  const [patients, setPatients] =
    useState([]);

  const [selectedAppointment,
    setSelectedAppointment] =
    useState(null);

  const [toast, setToast] =
    useState({

      show: false,

      message: "",

      type: "success",

    });

  const [confirmOpen,
    setConfirmOpen] =
    useState(false);

  const [rejectOpen,
    setRejectOpen] =
    useState(false);

  const [rescheduleOpen,
    setRescheduleOpen] =
    useState(false);

  useEffect(() => {

    loadDashboard();

  }, []);

  // ====================================
  // LOAD DASHBOARD
  // ====================================

  const loadDashboard = async () => {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) {

        setToast({

          show: true,

          message:
            "Please login again.",

          type: "error",

        });

        return;

      }

      const config = {

        headers: {

          Authorization:
            `Bearer ${token}`,

        },

      };

      const appointmentRes =
        await axios.get(

          `${API_URL}/api/appointment`,

          config

        );

      const patientRes =
        await axios.get(

          `${API_URL}/api/admin/patients`,

          config

        );
      console.log("Appointment API Response");
console.log(appointmentRes);

console.log("Appointments Array");
console.log(appointmentRes.data.appointments);

console.log(
  "Appointments Length:",
  appointmentRes.data.appointments.length
);  
      setAppointments(

        appointmentRes.data.appointments || []

      );

      setPatients(

        patientRes.data.patients || []

      );

    }

    catch (err) {

      console.log(err);

      setToast({

        show: true,

        message:

          err.response?.data?.message ||

          "Unable to load dashboard.",

        type: "error",

      });

    }

  };

  // ====================================
  // DASHBOARD COUNTS
  // ====================================

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const todaysAppointments =
    appointments.filter(

      item =>

        item.appointmentDate === today

    );

  const pendingAppointments =
    appointments.filter(

      item =>

        item.status === "Pending"

    );

  const pendingPayments =
    appointments.filter(

      item =>

        item.paymentStatus === "Submitted"

    );

  const completedSessions =
    appointments.filter(

      item =>

        item.status === "Completed"

    );

  const revenue =
    appointments

      .filter(

        item =>

          item.paymentStatus === "Paid"

      )

      .reduce(

        (sum, item) =>

          sum + (item.paymentAmount || 0),

        0

      );
        // ====================================
  // APPROVE APPOINTMENT
  // ====================================

  const approveAppointment = async (appointment) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(

        `${API_URL}/api/appointment/approve/${appointment._id}`,

        {},

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

      setToast({

        show: true,

        message:
          "Appointment Approved Successfully",

        type: "success",

      });

      loadDashboard();

    }

    catch (err) {

      setToast({

        show: true,

        message:

          err.response?.data?.message ||

          "Unable to approve appointment.",

        type: "error",

      });

    }

  };

  // ====================================
  // OPEN REJECT MODAL
  // ====================================

  const rejectAppointment = (appointment) => {

    setSelectedAppointment(
      appointment
    );

    setRejectOpen(true);

  };

  // ====================================
  // OPEN RESCHEDULE MODAL
  // ====================================

  const rescheduleAppointment = (appointment) => {

    setSelectedAppointment(
      appointment
    );

    setRescheduleOpen(true);

  };

  // ====================================
  // OPEN VERIFY PAYMENT MODAL
  // ====================================

  const verifyPayment = (appointment) => {

    setSelectedAppointment(
      appointment
    );

    setConfirmOpen(true);

  };

  // ====================================
  // VERIFY PAYMENT
  // ====================================

  const confirmVerifyPayment = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(

        `${API_URL}/api/appointment/verify-payment/${selectedAppointment._id}`,

        {},

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

      setConfirmOpen(false);

      setSelectedAppointment(null);

      setToast({

        show: true,

        message:

          "Payment Verified • Google Meet Created",

        type: "success",

      });

      loadDashboard();

    }

    catch (err) {

      setToast({

        show: true,

        message:

          err.response?.data?.message ||

          "Unable to verify payment.",

        type: "error",

      });

    }

  };

  // ====================================
  // REJECT CONFIRM
  // ====================================

  const confirmReject = async (reason) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(

        `${API_URL}/api/appointment/reject/${selectedAppointment._id}`,

        {

          reason,

        },

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

      setRejectOpen(false);

      setSelectedAppointment(null);

      setToast({

        show: true,

        message:
          "Appointment Rejected",

        type: "success",

      });

      loadDashboard();

    }

    catch (err) {

      setToast({

        show: true,

        message:

          err.response?.data?.message ||

          "Unable to reject appointment.",

        type: "error",

      });

    }

  };

  // ====================================
  // RESCHEDULE CONFIRM
  // ====================================

  const confirmReschedule = async (

    date,

    time

  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(

        `${API_URL}/api/appointment/reschedule/${selectedAppointment._id}`,

        {

          date,

          time,

        },

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

      setRescheduleOpen(false);

      setSelectedAppointment(null);

      setToast({

        show: true,

        message:

          "Appointment Rescheduled Successfully",

        type: "success",

      });

      loadDashboard();

    }

    catch (err) {

      setToast({

        show: true,

        message:

          err.response?.data?.message ||

          "Unable to reschedule.",

        type: "error",

      });

    }

  };
    // ====================================
  // RENDER
  // ====================================

  return (

    <AdminLayout>

      <h1
        style={{
          color: "#47685F",
          marginBottom: "35px",
        }}
      >
        Therapist Dashboard
      </h1>

      <DashboardStats
        totalPatients={patients.length}
        todaysAppointments={todaysAppointments.length}
        pendingAppointments={pendingAppointments.length}
        pendingPayments={pendingPayments.length}
        completedSessions={completedSessions.length}
        revenue={revenue}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "25px",
          alignItems: "start",
          marginTop: "25px",
        }}
      >

        {/* LEFT */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >

          <PendingQueue
            appointments={appointments}
            onApprove={approveAppointment}
            onReject={rejectAppointment}
            onReschedule={rescheduleAppointment}
          />

          <PaymentQueue
            appointments={appointments}
            onVerify={verifyPayment}
          />

        </div>

        {/* RIGHT */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >

          <TodaysSchedule
            appointments={appointments}
          />

          <RecentPatients
            patients={patients}
          />

        </div>

      </div>
            {/* ========================= */}
      {/* VERIFY PAYMENT MODAL */}
      {/* ========================= */}

      <ConfirmModal
        open={confirmOpen}
        title="Verify Payment"
        message="This will verify the payment, generate a Google Meet link and send a confirmation email."
        confirmText="Verify Payment"
        cancelText="Cancel"
        onCancel={() => {

          setConfirmOpen(false);

          setSelectedAppointment(null);

        }}
        onConfirm={confirmVerifyPayment}
      />

      {/* ========================= */}
      {/* REJECT MODAL */}
      {/* ========================= */}

      <RejectModal
        open={rejectOpen}
        onCancel={() => {

          setRejectOpen(false);

          setSelectedAppointment(null);

        }}
        onConfirm={confirmReject}
      />

      {/* ========================= */}
      {/* RESCHEDULE MODAL */}
      {/* ========================= */}

      <RescheduleModal
        open={rescheduleOpen}
        onCancel={() => {

          setRescheduleOpen(false);

          setSelectedAppointment(null);

        }}
        onConfirm={confirmReschedule}
      />

      {/* ========================= */}
      {/* TOAST */}
      {/* ========================= */}

      {toast.show && (

        <Toast

          message={toast.message}

          type={toast.type}

          onClose={() =>

            setToast({

              show: false,

              message: "",

              type: "success",

            })

          }

        />

      )}

    </AdminLayout>

  );

}
export default AdminDashboard;