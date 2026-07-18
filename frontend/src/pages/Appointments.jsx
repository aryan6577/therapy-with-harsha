import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./admin/Appointments.css";
function Appointments() {

  const navigate = useNavigate();

  // =====================================================
  // APPOINTMENTS
  // =====================================================

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  // =====================================================
  // SEARCH & FILTER
  // =====================================================

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [dateFilter, setDateFilter] = useState("");

  // =====================================================
  // PAYMENT REVIEW MODAL
  // =====================================================

  const [showPaymentModal, setShowPaymentModal] =
    useState(false);

  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  const [processingPayment, setProcessingPayment] =
    useState(false);

  const [rejectReason, setRejectReason] =
    useState("");

  // =====================================================
  // IMAGE PREVIEW
  // =====================================================

  const [previewImage, setPreviewImage] =
    useState("");

  const [showImagePreview, setShowImagePreview] =
    useState(false);

  // =====================================================
  // LOADING STATES
  // =====================================================

  const [approving, setApproving] =
    useState(false);

  const [rejecting, setRejecting] =
    useState(false);

  const [completing, setCompleting] =
    useState(false);

  // =====================================================
  // SORTING
  // =====================================================

  const [sortField, setSortField] =
    useState("appointmentDate");

  const [sortDirection, setSortDirection] =
    useState("asc");

  // =====================================================
  // PAGINATION
  // =====================================================

  const [currentPage, setCurrentPage] =
    useState(1);

  const appointmentsPerPage = 10;

  // =====================================================
  // REFRESH KEY
  // =====================================================

  const [refreshing, setRefreshing] =
  useState(false);
  // =====================================================
  // LOAD APPOINTMENTS
  // =====================================================

  const loadAppointments = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(

        "http://localhost:5000/api/appointment",

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      if (response.data.success) {

        setAppointments(

          response.data.appointments || []

        );

      } else {

        setAppointments([]);

      }

    }

    catch (error) {

      console.error(error);

      alert(

        error.response?.data?.message ||

        "Unable to load appointments."

      );

    }

    finally {

      setLoading(false);

    }

  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    loadAppointments();

  }, []);

  

  // =====================================================
  // MANUAL REFRESH
  // =====================================================

  const refreshAppointments = async () => {

  if (refreshing) return;

  setRefreshing(true);

  try {

    await loadAppointments();

  }

  finally {

    setTimeout(() => {

      setRefreshing(false);

    }, 700);

  }

};

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {

    setSearch("");

    setStatusFilter("All");

    setDateFilter("");

    setCurrentPage(1);

  };

  // =====================================================
  // SORT FUNCTION
  // =====================================================

  const handleSort = (field) => {

    if (sortField === field) {

      setSortDirection(

        sortDirection === "asc"

          ? "desc"

          : "asc"

      );

    } else {

      setSortField(field);

      setSortDirection("asc");

    }

  };
    // =====================================================
  // FILTERED + SORTED APPOINTMENTS
  // =====================================================

  const filteredAppointments = useMemo(() => {

    let data = [...appointments];

    // -----------------------------
    // STATUS FILTER
    // -----------------------------

    if (statusFilter !== "All") {

      data = data.filter(

        item => item.status === statusFilter

      );

    }

    // -----------------------------
    // DATE FILTER
    // -----------------------------

    if (dateFilter) {

      data = data.filter(

        item =>

          item.appointmentDate === dateFilter

      );

    }

    // -----------------------------
    // SEARCH
    // -----------------------------

    if (search.trim()) {

      const value = search.toLowerCase();

      data = data.filter(item =>

        item.patient?.fullName
          ?.toLowerCase()
          .includes(value)

        ||

        item.patient?.email
          ?.toLowerCase()
          .includes(value)

        ||

        item.patient?.phone
          ?.toLowerCase()
          .includes(value)

        ||

        item.patient?.patientId
          ?.toLowerCase()
          .includes(value)

        ||

        item.appointmentId
          ?.toLowerCase()
          .includes(value)

      );

    }

    // -----------------------------
    // SORTING
    // -----------------------------

    data.sort((a, b) => {

      let first = a[sortField];

      let second = b[sortField];

      if (sortField === "patient") {

        first =
          a.patient?.fullName || "";

        second =
          b.patient?.fullName || "";

      }

      if (first == null) first = "";

      if (second == null) second = "";

      if (typeof first === "string") {

        first = first.toLowerCase();

      }

      if (typeof second === "string") {

        second = second.toLowerCase();

      }

      if (sortDirection === "asc") {

        return first > second ? 1 : -1;

      }

      return first < second ? 1 : -1;

    });

    return data;

  }, [

    appointments,

    search,

    statusFilter,

    dateFilter,

    sortField,

    sortDirection,

  ]);

  // =====================================================
  // DASHBOARD COUNTS
  // =====================================================

  const pendingCount = appointments.filter(

    a => a.status === "Pending"

  ).length;

  const approvedCount = appointments.filter(

    a => a.status === "Approved"

  ).length;

  const completedCount = appointments.filter(

    a => a.status === "Completed"

  ).length;

  const rejectedCount = appointments.filter(

    a => a.status === "Rejected"

  ).length;

  const paymentPending = appointments.filter(

    a =>

      a.paymentStatus === "Submitted"

  ).length;

  // =====================================================
  // TODAY'S APPOINTMENTS
  // =====================================================

  const today = new Date()

    .toISOString()

    .split("T")[0];

  const todayAppointments = appointments.filter(

    item =>

      item.appointmentDate === today

  );

  // =====================================================
  // PAGINATION
  // =====================================================

  const indexOfLastAppointment =

    currentPage * appointmentsPerPage;

  const indexOfFirstAppointment =

    indexOfLastAppointment -

    appointmentsPerPage;

  const currentAppointments =

    filteredAppointments.slice(

      indexOfFirstAppointment,

      indexOfLastAppointment

    );

  const totalPages = Math.ceil(

    filteredAppointments.length /

      appointmentsPerPage

  );

  const goToNextPage = () => {

    if (currentPage < totalPages) {

      setCurrentPage(

        currentPage + 1

      );

    }

  };

  const goToPreviousPage = () => {

    if (currentPage > 1) {

      setCurrentPage(

        currentPage - 1

      );

    }

  };
    // =====================================================
  // APPROVE APPOINTMENT
  // =====================================================

  const approveAppointment = async (id) => {

    const confirmApprove = window.confirm(
      "Approve this appointment?"
    );

    if (!confirmApprove) return;

    try {

      setApproving(true);

      const token =
        localStorage.getItem("token");

      await axios.put(

        `http://localhost:5000/api/appointment/approve/${id}`,

        {},

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

      alert(
        "Appointment Approved Successfully."
      );

      loadAppointments();

    }

    catch (err) {

      console.error(err);

      alert(

        err.response?.data?.message ||

        "Unable to approve appointment."

      );

    }

    finally {

      setApproving(false);

    }

  };

  // =====================================================
  // REJECT APPOINTMENT
  // =====================================================

  const rejectAppointment = async (id) => {

    const reason = prompt(
      "Enter rejection reason"
    );

    if (reason === null) return;

    if (!reason.trim()) {

      alert(
        "Rejection reason is required."
      );

      return;

    }

    try {

      setRejecting(true);

      const token =
        localStorage.getItem("token");

      await axios.put(

        `http://localhost:5000/api/appointment/reject/${id}`,

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

      alert(
        "Appointment Rejected."
      );

      loadAppointments();

    }

    catch (err) {

      console.error(err);

      alert(

        err.response?.data?.message ||

        "Unable to reject appointment."

      );

    }

    finally {

      setRejecting(false);

    }

  };

  // =====================================================
  // COMPLETE APPOINTMENT
  // =====================================================

  const completeAppointment = async (id) => {

    const confirmComplete = window.confirm(
      "Mark this appointment as completed?"
    );

    if (!confirmComplete) return;

    try {

      setCompleting(true);

      const token =
        localStorage.getItem("token");

      await axios.put(

        `http://localhost:5000/api/appointment/complete/${id}`,

        {},

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

      alert(
        "Appointment marked as completed."
      );

      loadAppointments();

    }

    catch (err) {

      console.error(err);

      alert(

        err.response?.data?.message ||

        "Unable to complete appointment."

      );

    }

    finally {

      setCompleting(false);

    }

  };

  // =====================================================
  // DELETE APPOINTMENT (OPTIONAL)
  // =====================================================

  const deleteAppointment = async (id) => {

    const confirmDelete = window.confirm(

      "Delete this appointment permanently?"

    );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(

        `http://localhost:5000/api/appointment/${id}`,

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

      alert(
        "Appointment Deleted."
      );

      loadAppointments();

    }

    catch (err) {

      console.error(err);

      alert(

        err.response?.data?.message ||

        "Unable to delete appointment."

      );

    }

  };
    // =====================================================
  // OPEN PAYMENT REVIEW MODAL
  // =====================================================

  const openPaymentModal = (appointment) => {

    setSelectedAppointment(appointment);

    setRejectReason("");

    setShowPaymentModal(true);

  };

  // =====================================================
  // CLOSE PAYMENT REVIEW MODAL
  // =====================================================

  const closePaymentModal = () => {

    setSelectedAppointment(null);

    setRejectReason("");

    setShowPaymentModal(false);

  };

  // =====================================================
  // VERIFY PAYMENT
  // =====================================================

  const verifyPayment = async () => {

    if (!selectedAppointment) return;

    try {

      setProcessingPayment(true);

      const token =
        localStorage.getItem("token");

      await axios.put(

        `http://localhost:5000/api/appointment/verify-payment/${selectedAppointment._id}`,

        {},

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      alert("Payment Verified Successfully.");

      closePaymentModal();

      loadAppointments();

    }

    catch (err) {

      console.error(err);

      alert(

        err.response?.data?.message ||

        "Unable to verify payment."

      );

    }

    finally {

      setProcessingPayment(false);

    }

  };

  // =====================================================
  // REJECT PAYMENT
  // =====================================================

  const rejectPayment = async () => {

    if (!selectedAppointment) return;

    if (!rejectReason.trim()) {

      alert("Please enter rejection reason.");

      return;

    }

    try {

      setProcessingPayment(true);

      const token =
        localStorage.getItem("token");

      await axios.put(

        `http://localhost:5000/api/appointment/reject-payment/${selectedAppointment._id}`,

        {

          reason: rejectReason,

        },

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      alert("Payment Rejected.");

      closePaymentModal();

      loadAppointments();

    }

    catch (err) {

      console.error(err);

      alert(

        err.response?.data?.message ||

        "Unable to reject payment."

      );

    }

    finally {

      setProcessingPayment(false);

    }

  };

  // =====================================================
  // IMAGE PREVIEW
  // =====================================================

  const openImagePreview = (image) => {

    if (!image) return;

    setPreviewImage(image);

    setShowImagePreview(true);

  };

  const closeImagePreview = () => {

    setPreviewImage("");

    setShowImagePreview(false);

  };

  // =====================================================
  // GOOGLE MEET
  // =====================================================

  const openMeet = (link) => {

    if (!link) return;

    window.open(

      link,

      "_blank",

      "noopener,noreferrer"

    );

  };

  // =====================================================
  // NAVIGATION
  // =====================================================

  const viewAppointment = (id) => {

    navigate(

      `/admin/appointments/${id}`

    );

  };

  const openClinicalNotes = (id) => {

    navigate(

      `/admin/clinical/${id}`

    );

  };
    // =====================================================
  // PAGE UI
  // =====================================================

  return (

    <div
      style={{
        background: "#F5F6FA",
        minHeight: "100vh",
        padding: "35px",
      }}
    >

      {/* ========================================== */}
      {/* PAGE HEADER */}
      {/* ========================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "35px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >

        <div>

          <h1
            style={{
              margin: 0,
              color: "#47685F",
              fontSize: "34px",
              fontWeight: "700",
            }}
          >
            Appointment Dashboard
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#777",
              fontSize: "15px",
            }}
          >
            Manage appointments, payments and therapy sessions.
          </p>

        </div>

        <button
  onClick={refreshAppointments}
  disabled={refreshing}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",

    background: refreshing
      ? "#EDF7F3"
      : "#FFFFFF",

    color: "#47685F",

    border: "1px solid #D9E5DF",

    padding: "12px 22px",

    borderRadius: "50px",

    cursor: refreshing
      ? "default"
      : "pointer",

    fontWeight: "700",

    fontSize: "15px",

    boxShadow:
      "0 10px 25px rgba(0,0,0,.08)",

    transition: "all .3s ease",
  }}
>
  <span
  className={refreshing ? "refresh-spin" : ""}
  style={{
    display: "inline-block",
    fontSize: "18px",
  }}
>
    ↻
  </span>

  {refreshing
    ? "Refreshing..."
    : "Refresh"}
</button>

      </div>

      {/* ========================================== */}
      {/* DASHBOARD CARDS */}
      {/* ========================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >

        <DashboardCard
          title="Today's Appointments"
          value={todayAppointments.length}
          color="#47685F"
        />

        <DashboardCard
          title="Pending"
          value={pendingCount}
          color="#F4B400"
        />

        <DashboardCard
          title="Approved"
          value={approvedCount}
          color="#2E7D32"
        />

        <DashboardCard
          title="Completed"
          value={completedCount}
          color="#1976D2"
        />

        <DashboardCard
          title="Rejected"
          value={rejectedCount}
          color="#D32F2F"
        />

        <DashboardCard
          title="Payments Pending"
          value={paymentPending}
          color="#7B1FA2"
        />

      </div>
            {/* ========================================== */}
      {/* SEARCH & FILTERS */}
      {/* ========================================== */}

      <div
        style={{
          background: "#FFFFFF",
          padding: "25px",
          borderRadius: "18px",
          marginBottom: "30px",
          boxShadow: "0 8px 24px rgba(0,0,0,.08)",
        }}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "2fr 1fr 1fr auto",
            gap: "18px",
            alignItems: "center",
          }}
        >

          {/* SEARCH */}

          <input

            type="text"

            placeholder="Search by patient name, email, phone, patient ID or appointment ID..."

            value={search}

            onChange={(e) => {

              setSearch(e.target.value);

              setCurrentPage(1);

            }}

            style={inputStyle}

          />

          {/* STATUS FILTER */}

          <select

            value={statusFilter}

            onChange={(e) => {

              setStatusFilter(e.target.value);

              setCurrentPage(1);

            }}

            style={inputStyle}

          >

            <option value="All">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Rejected">
              Rejected
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

            <option value="Rescheduled">
              Rescheduled
            </option>

          </select>

          {/* DATE FILTER */}

          <input

            type="date"

            value={dateFilter}

            onChange={(e) => {

              setDateFilter(e.target.value);

              setCurrentPage(1);

            }}

            style={inputStyle}

          />

          {/* CLEAR BUTTON */}

          <button

            onClick={clearFilters}

            style={{

              border: "none",

              background: "#E53935",

              color: "#FFF",

              padding: "13px 18px",

              borderRadius: "10px",

              cursor: "pointer",

              fontWeight: "600",

              whiteSpace: "nowrap",

            }}

          >

            Clear Filters

          </button>

        </div>

        {/* SUMMARY */}

        <div
          style={{
            marginTop: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >

          <span
            style={{
              color: "#666",
              fontSize: "14px",
            }}
          >

            Showing

            <strong>

              {" "}

              {currentAppointments.length}

            </strong>

            {" "}of{" "}

            <strong>

              {filteredAppointments.length}

            </strong>

            {" "}filtered appointments

          </span>

          <span
            style={{
              color: "#888",
              fontSize: "14px",
            }}
          >

            Total Records:{" "}

            <strong>

              {appointments.length}

            </strong>

          </span>

        </div>

      </div>
            {/* ========================================== */}
      {/* APPOINTMENTS TABLE */}
      {/* ========================================== */}

      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,.08)",
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >

          {/* ========================= */}
          {/* TABLE HEADER */}
          {/* ========================= */}

          <thead>

            <tr
              style={{
                background: "#47685F",
                color: "#FFF",
              }}
            >

              <th style={thStyle}>
                Patient
              </th>

              <th style={thStyle}>
                Appointment
              </th>

              <th style={thStyle}>
                Status
              </th>

              <th style={thStyle}>
                Payment
              </th>

              <th style={thStyle}>
                Actions
              </th>

            </tr>

          </thead>

          {/* ========================= */}
          {/* TABLE BODY */}
          {/* ========================= */}

          <tbody>

            {/* LOADING */}

            {

              loading ? (

                <tr>

                  <td
                    colSpan="5"
                    style={emptyStyle}
                  >

                    Loading appointments...

                  </td>

                </tr>

              )

              :

              currentAppointments.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    style={emptyStyle}
                  >

                    No appointments found.

                  </td>

                </tr>

              )

              :

              currentAppointments.map(

                (appointment) => (

                  <tr
                    key={appointment._id}
                  >

                    {/* ========================= */}
                    {/* PATIENT COLUMN */}
                    {/* ========================= */}

                    <td style={tdStyle}>

                      <strong
                        style={{
                          fontSize: "15px",
                        }}
                      >

                        {

                          appointment.patient?.fullName ||

                          "Unknown Patient"

                        }

                      </strong>

                      <br />

                      <span style={smallText}>

                        ID :

                        {" "}

                        {

                          appointment.patient?.patientId ||

                          "-"

                        }

                      </span>

                      <br />

                      <span style={smallText}>

                        {

                          appointment.patient?.phone ||

                          "-"

                        }

                      </span>

                      <br />

                      <span style={smallText}>

                        {

                          appointment.patient?.email ||

                          "-"

                        }

                      </span>

                    </td>
                                        {/* ========================= */}
                    {/* APPOINTMENT COLUMN */}
                    {/* ========================= */}

                    <td style={tdStyle}>

                      <strong
                        style={{
                          color: "#47685F",
                          fontSize: "15px",
                        }}
                      >

                        {

                          appointment.appointmentId ||

                          "-"

                        }

                      </strong>

                      <br />

                      <span style={smallText}>

                        📅

                        {" "}

                        {

                          appointment.appointmentDate ||

                          "-"

                        }

                      </span>

                      <br />

                      <span style={smallText}>

                        🕒

                        {" "}

                        {

                          appointment.appointmentTime ||

                          "-"

                        }

                      </span>

                      <br />

                      <span style={smallText}>

                        🩺

                        {" "}

                        {

                          appointment.appointmentType ||

                          "Therapy Session"

                        }

                      </span>

                      {

                        appointment.sessionDuration && (

                          <>

                            <br />

                            <span style={smallText}>

                              ⏳

                              {" "}

                              {

                                appointment.sessionDuration

                              }

                              {" "}Minutes

                            </span>

                          </>

                        )

                      }

                      {

                        appointment.googleMeetLink && (

                          <>

                            <br />

                            <button

                              style={{

                                marginTop: "10px",

                                background: "#009688",

                                color: "#FFF",

                                border: "none",

                                padding: "8px 12px",

                                borderRadius: "8px",

                                cursor: "pointer",

                                fontSize: "13px",

                                fontWeight: "600",

                              }}

                              onClick={() =>

                                openMeet(

                                  appointment.googleMeetLink

                                )

                              }

                            >

                              🎥 Join Google Meet

                            </button>

                          </>

                        )

                      }

                    </td>

                    {/* ========================= */}
                    {/* STATUS COLUMN */}
                                        <td style={tdStyle}>

                      <StatusBadge

                        status={appointment.status}

                      />

                      {

                        appointment.cancelReason && (

                          <>

                            <br />

                            <span
                              style={{
                                color: "#D32F2F",
                                fontSize: "12px",
                                marginTop: "8px",
                                display: "inline-block",
                              }}
                            >

                              <strong>Reason:</strong>

                              {" "}

                              {

                                appointment.cancelReason

                              }

                            </span>

                          </>

                        )

                      }

                      {

                        appointment.rejectionReason && (

                          <>

                            <br />

                            <span
                              style={{
                                color: "#D32F2F",
                                fontSize: "12px",
                                marginTop: "8px",
                                display: "inline-block",
                              }}
                            >

                              <strong>Rejected:</strong>

                              {" "}

                              {

                                appointment.rejectionReason

                              }

                            </span>

                          </>

                        )

                      }

                    </td>

                    {/* ========================= */}
                    {/* PAYMENT COLUMN */}
                    {/* ========================= */}

                    <td style={tdStyle}>

                      <PaymentBadge

                        status={appointment.paymentStatus}

                      />

                      <div
                        style={{
                          marginTop: "12px",
                          fontSize: "13px",
                          color: "#555",
                          lineHeight: "23px",
                        }}
                      >

                        <strong>

                          ₹

                          {" "}

                          {

                            appointment.paymentAmount ||

                            0

                          }

                        </strong>

                        <br />

                        {

                          appointment.transactionId ? (

                            <>

                              Transaction ID

                              <br />

                              <span
                                style={{
                                  color: "#1976D2",
                                  fontWeight: "600",
                                  wordBreak: "break-word",
                                }}
                              >

                                {

                                  appointment.transactionId

                                }

                              </span>

                            </>

                          ) : (

                            <span
                              style={{
                                color: "#999",
                              }}
                            >

                              No Transaction ID

                            </span>

                          )

                        }

                      </div>

                      {

                        appointment.paymentScreenshot && (

                          <button

                            style={{

                              marginTop: "12px",

                              width: "100%",

                              border: "none",

                              background: "#3949AB",

                              color: "#FFF",

                              padding: "9px",

                              borderRadius: "8px",

                              cursor: "pointer",

                              fontWeight: "600",

                            }}

                            onClick={() =>

                              openImagePreview(

                                appointment.paymentScreenshot

                              )

                            }

                          >

                            🖼 View Screenshot

                          </button>

                        )

                      }

                    </td>

                    {/* ========================= */}
                    {/* ACTIONS COLUMN */}
                    {/* ========================= */}
                                        <td style={tdStyle}>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >

                        {/* VIEW DETAILS */}

                        <button
                          style={viewButton}
                          onClick={() =>
                            viewAppointment(
                              appointment._id
                            )
                          }
                        >
                          👁 View Details
                        </button>

                        {/* APPROVE */}

                        {appointment.status === "Pending" && (

                          <button
                            style={approveButton}
                            disabled={approving}
                            onClick={() =>
                              approveAppointment(
                                appointment._id
                              )
                            }
                          >

                            {

                              approving
                                ? "Approving..."
                                : "✅ Approve"

                            }

                          </button>

                        )}

                        {/* REJECT */}

                        {appointment.status === "Pending" && (

                          <button
                            style={rejectButton}
                            disabled={rejecting}
                            onClick={() =>
                              rejectAppointment(
                                appointment._id
                              )
                            }
                          >

                            {

                              rejecting
                                ? "Rejecting..."
                                : "❌ Reject"

                            }

                          </button>

                        )}

                        {/* REVIEW PAYMENT */}

                        {

                          appointment.paymentStatus === "Submitted" && (

                            <button

                              style={verifyButton}

                              disabled={processingPayment}

                              onClick={() =>

                                openPaymentModal(
                                  appointment
                                )

                              }

                            >

                              {

                                processingPayment

                                  ? "Processing..."

                                  : "💳 Review Payment"

                              }

                            </button>

                          )

                        }

                        {/* CLINICAL NOTES */}

                        {

                          appointment.status === "Approved" && (

                            <button

                              style={notesButton}

                              onClick={() =>

                                openClinicalNotes(
                                  appointment._id
                                )

                              }

                            >

                              📝 Clinical Notes

                            </button>

                          )

                        }

                        {/* COMPLETE */}

                        {

                          appointment.status === "Approved" && (

                            <button

                              style={completeButton}

                              disabled={completing}

                              onClick={() =>

                                completeAppointment(
                                  appointment._id
                                )

                              }

                            >

                              {

                                completing

                                  ? "Completing..."

                                  : "✔ Complete"

                              }

                            </button>

                          )

                        }

                        {/* GOOGLE MEET */}

                        {

                          appointment.googleMeetLink && (

                            <button

                              style={meetButton}

                              onClick={() =>

                                openMeet(
                                  appointment.googleMeetLink
                                )

                              }

                            >

                              🎥 Join Meet

                            </button>

                          )

                        }

                      </div>

                    </td>

                  </tr>

                )

              )

            }

          </tbody>

        </table>

      </div>
            {/* ========================================== */}
      {/* PAGINATION */}
      {/* ========================================== */}

      {

        totalPages > 1 && (

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "30px",
              background: "#FFF",
              padding: "18px 25px",
              borderRadius: "15px",
              boxShadow:
                "0 6px 18px rgba(0,0,0,.08)",
            }}
          >

            <button

              style={{

                ...viewButton,

                opacity:

                  currentPage === 1

                    ? .5

                    : 1,

              }}

              disabled={

                currentPage === 1

              }

              onClick={goToPreviousPage}

            >

              ← Previous

            </button>

            <div
              style={{
                fontWeight: "600",
                color: "#555",
              }}
            >

              Page

              {" "}

              {currentPage}

              {" "}of{" "}

              {totalPages}

            </div>

            <button

              style={{

                ...viewButton,

                opacity:

                  currentPage === totalPages

                    ? .5

                    : 1,

              }}

              disabled={

                currentPage === totalPages

              }

              onClick={goToNextPage}

            >

              Next →

            </button>

          </div>

        )

      }

      {/* ========================================== */}
      {/* IMAGE PREVIEW MODAL */}
      {/* ========================================== */}

      {

        showImagePreview && (

          <div

            onClick={closeImagePreview}

            style={{

              position: "fixed",

              top: 0,

              left: 0,

              width: "100%",

              height: "100%",

              background: "rgba(0,0,0,.78)",

              display: "flex",

              justifyContent: "center",

              alignItems: "center",

              zIndex: 9998,

            }}

          >

            <img

              src={previewImage}

              alt="Payment Screenshot"

              onClick={(e)=>

                e.stopPropagation()

              }

              style={{

                maxWidth: "92%",

                maxHeight: "92%",

                borderRadius: "14px",

                background: "#FFF",

                padding: "12px",

                boxShadow:

                  "0 20px 45px rgba(0,0,0,.45)",

              }}

            />

          </div>

        )

      }
            {/* ========================================== */}
      {/* PAYMENT VERIFICATION MODAL */}
      {/* ========================================== */}

      {

        showPaymentModal &&

        selectedAppointment && (

          <div

            style={{

              position: "fixed",

              top: 0,

              left: 0,

              width: "100%",

              height: "100%",

              background: "rgba(0,0,0,.60)",

              display: "flex",

              justifyContent: "center",

              alignItems: "center",

              zIndex: 9999,

            }}

          >

            <div

              style={{

                width: "760px",

                maxWidth: "95%",

                background: "#FFF",

                borderRadius: "18px",

                padding: "30px",

                maxHeight: "90vh",

                overflowY: "auto",

                boxShadow:

                  "0 25px 50px rgba(0,0,0,.25)",

              }}

            >

              <h2

                style={{

                  marginTop: 0,

                  color: "#47685F",

                  marginBottom: "25px",

                }}

              >

                Payment Verification

              </h2>

              <div

                style={{

                  display: "grid",

                  gridTemplateColumns: "1fr 1fr",

                  gap: "25px",

                  marginBottom: "25px",

                }}

              >

                {/* LEFT */}

                <div style={{ lineHeight: "30px" }}>

                  <p>

                    <strong>Patient :</strong>

                    {" "}

                    {

                      selectedAppointment.patient?.fullName

                    }

                  </p>

                  <p>

                    <strong>Email :</strong>

                    {" "}

                    {

                      selectedAppointment.patient?.email

                    }

                  </p>

                  <p>

                    <strong>Phone :</strong>

                    {" "}

                    {

                      selectedAppointment.patient?.phone

                    }

                  </p>

                  <p>

                    <strong>Patient ID :</strong>

                    {" "}

                    {

                      selectedAppointment.patient?.patientId

                    }

                  </p>

                </div>

                {/* RIGHT */}

                <div style={{ lineHeight: "30px" }}>

                  <p>

                    <strong>Appointment ID :</strong>

                    {" "}

                    {

                      selectedAppointment.appointmentId

                    }

                  </p>

                  <p>

                    <strong>Date :</strong>

                    {" "}

                    {

                      selectedAppointment.appointmentDate

                    }

                  </p>

                  <p>

                    <strong>Time :</strong>

                    {" "}

                    {

                      selectedAppointment.appointmentTime

                    }

                  </p>

                  <p>

                    <strong>Amount :</strong>

                    ₹

                    {" "}

                    {

                      selectedAppointment.paymentAmount

                    }

                  </p>

                </div>

              </div>

              <div
                style={{
                  marginBottom: "20px",
                }}
              >

                <strong>

                  Transaction ID

                </strong>

                <div

                  style={{

                    marginTop: "8px",

                    padding: "12px",

                    background: "#F7F7F7",

                    borderRadius: "10px",

                    wordBreak: "break-word",

                  }}

                >

                  {

                    selectedAppointment.transactionId ||

                    "Not Available"

                  }

                </div>

              </div>
                            {/* ========================================== */}
              {/* PAYMENT SCREENSHOT */}
              {/* ========================================== */}

              {

                selectedAppointment.paymentScreenshot && (

                  <div
                    style={{
                      marginTop: "20px",
                      textAlign: "center",
                    }}
                  >

                    <img

                      src={
                        selectedAppointment.paymentScreenshot
                      }

                      alt="Payment Screenshot"

                      style={{

                        width: "100%",

                        maxHeight: "360px",

                        objectFit: "contain",

                        border: "1px solid #DDD",

                        borderRadius: "12px",

                        cursor: "pointer",

                      }}

                      onClick={() =>

                        openImagePreview(

                          selectedAppointment.paymentScreenshot

                        )

                      }

                    />

                  </div>

                )

              }

              {/* ========================================== */}
              {/* REJECTION REASON */}
              {/* ========================================== */}

              <textarea

                placeholder="Enter rejection reason (required only if rejecting payment)..."

                value={rejectReason}

                onChange={(e) =>

                  setRejectReason(

                    e.target.value

                  )

                }

                style={{

                  width: "100%",

                  marginTop: "25px",

                  height: "120px",

                  padding: "15px",

                  borderRadius: "10px",

                  border: "1px solid #DDD",

                  resize: "none",

                  boxSizing: "border-box",

                  fontSize: "15px",

                }}

              />

              {/* ========================================== */}
              {/* ACTION BUTTONS */}
              {/* ========================================== */}

              <div

                style={{

                  display: "flex",

                  gap: "15px",

                  marginTop: "30px",

                }}

              >

                <button

                  style={{

                    ...approveButton,

                    flex: 1,

                  }}

                  disabled={processingPayment}

                  onClick={verifyPayment}

                >

                  {

                    processingPayment

                      ? "Processing..."

                      : "✅ Verify Payment"

                  }

                </button>

                <button

                  style={{

                    ...rejectButton,

                    flex: 1,

                  }}

                  disabled={processingPayment}

                  onClick={rejectPayment}

                >

                  ❌ Reject Payment

                </button>

                <button

                  style={{

                    ...viewButton,

                    flex: 1,

                  }}

                  onClick={closePaymentModal}

                >

                  Close

                </button>

              </div>

            </div>

          </div>

        )

      }

    </div>

  );

}
// =====================================================
// DASHBOARD CARD
// =====================================================

function DashboardCard({

  title,

  value,

  color,

}) {

  return (

    <div

      style={{

        background: "#FFF",

        padding: "22px",

        borderRadius: "15px",

        borderLeft: `6px solid ${color}`,

        boxShadow:

          "0 8px 20px rgba(0,0,0,.08)",

        transition: ".25s",

      }}

    >

      <h4

        style={{

          margin: 0,

          color: "#777",

          fontWeight: "500",

          fontSize: "15px",

        }}

      >

        {title}

      </h4>

      <h1

        style={{

          marginTop: "14px",

          color,

          fontSize: "34px",

          fontWeight: "700",

        }}

      >

        {value}

      </h1>

    </div>

  );

}
// =====================================================
// STATUS BADGE
// =====================================================

function StatusBadge({

  status,

}) {

  let background = "#757575";

  let text = status || "Unknown";

  switch (status) {

    case "Pending":

      background = "#F4B400";

      break;

    case "Approved":

      background = "#2E7D32";

      break;

    case "Completed":

      background = "#1976D2";

      break;

    case "Rejected":

      background = "#D32F2F";

      break;

    case "Cancelled":

      background = "#616161";

      break;

    case "Rescheduled":

      background = "#7B1FA2";

      break;

    case "In Progress":

      background = "#00897B";

      break;

    default:

      background = "#757575";

  }

  return (

    <span

      style={{

        display: "inline-block",

        background,

        color: "#FFF",

        padding: "8px 15px",

        borderRadius: "30px",

        fontWeight: "600",

        fontSize: "13px",

        textAlign: "center",

        minWidth: "110px",

      }}

    >

      {text}

    </span>

  );

}
// =====================================================
// PAYMENT BADGE
// =====================================================

function PaymentBadge({

  status,

}) {

  let background = "#757575";

  let text = status || "Unknown";

  switch (status) {

    case "Pending":

      background = "#FB8C00";

      break;

    case "Submitted":

      background = "#7B1FA2";

      break;

    case "Paid":

      background = "#2E7D32";

      break;

    case "Verified":

      background = "#2E7D32";

      break;

    case "Rejected":

      background = "#D32F2F";

      break;

    case "Refunded":

      background = "#455A64";

      break;

    case "Failed":

      background = "#C62828";

      break;

    default:

      background = "#757575";

  }

  return (

    <span

      style={{

        display: "inline-block",

        background,

        color: "#FFF",

        padding: "8px 15px",

        borderRadius: "30px",

        fontWeight: "600",

        fontSize: "13px",

        textAlign: "center",

        minWidth: "120px",

      }}

    >

      {text}

    </span>

  );

}
// =====================================================
// COMMON STYLES
// =====================================================

const inputStyle = {

  width: "100%",

  padding: "13px 15px",

  border: "1px solid #DDD",

  borderRadius: "10px",

  fontSize: "15px",

  outline: "none",

  boxSizing: "border-box",

  transition: ".25s",

};

const thStyle = {

  padding: "18px",

  textAlign: "left",

  fontWeight: "600",

  fontSize: "15px",

  whiteSpace: "nowrap",

};

const tdStyle = {

  padding: "18px",

  borderBottom: "1px solid #EEE",

  verticalAlign: "top",

  fontSize: "14px",

};

const smallText = {

  color: "#666",

  fontSize: "13px",

  lineHeight: "22px",

};

const emptyStyle = {

  padding: "45px",

  textAlign: "center",

  color: "#888",

  fontSize: "16px",

};

// =====================================================
// BUTTON BASE
// =====================================================

const buttonBase = {

  border: "none",

  padding: "10px 14px",

  borderRadius: "8px",

  cursor: "pointer",

  color: "#FFF",

  fontWeight: "600",

  fontSize: "14px",

  transition: ".25s",

};

// =====================================================
// BUTTON COLORS
// =====================================================

const viewButton = {

  ...buttonBase,

  background: "#1976D2",

};

const approveButton = {

  ...buttonBase,

  background: "#2E7D32",

};

const rejectButton = {

  ...buttonBase,

  background: "#D32F2F",

};

const verifyButton = {

  ...buttonBase,

  background: "#7B1FA2",

};

const meetButton = {

  ...buttonBase,

  background: "#009688",

};

const notesButton = {

  ...buttonBase,

  background: "#795548",

};

const completeButton = {

  ...buttonBase,

  background: "#455A64",

};

const deleteButton = {

  ...buttonBase,

  background: "#B71C1C",

};

const refreshButton = {

  ...buttonBase,

  background: "#47685F",

};

const cancelButton = {

  ...buttonBase,

  background: "#757575",

};
// =====================================================
// MODAL STYLES
// =====================================================

const modalOverlayStyle = {

  position: "fixed",

  top: 0,

  left: 0,

  width: "100%",

  height: "100%",

  background: "rgba(0,0,0,.60)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  zIndex: 9999,

};

const modalContainerStyle = {

  width: "760px",

  maxWidth: "95%",

  background: "#FFF",

  borderRadius: "18px",

  padding: "30px",

  maxHeight: "90vh",

  overflowY: "auto",

  boxShadow: "0 25px 60px rgba(0,0,0,.25)",

};

// =====================================================
// CARD STYLE
// =====================================================

const dashboardCardStyle = {

  background: "#FFF",

  borderRadius: "15px",

  padding: "22px",

  boxShadow: "0 8px 20px rgba(0,0,0,.08)",

};

// =====================================================
// TABLE
// =====================================================

const tableContainerStyle = {

  background: "#FFF",

  borderRadius: "18px",

  overflow: "hidden",

  boxShadow: "0 8px 24px rgba(0,0,0,.08)",

};

const tableStyle = {

  width: "100%",

  borderCollapse: "collapse",

};

// =====================================================
// PAGINATION
// =====================================================

const paginationContainerStyle = {

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  marginTop: "30px",

  background: "#FFF",

  padding: "18px 25px",

  borderRadius: "15px",

  boxShadow: "0 6px 18px rgba(0,0,0,.08)",

};

const paginationButtonStyle = {

  ...viewButton,

  minWidth: "120px",

};

const pageTextStyle = {

  color: "#555",

  fontWeight: "600",

  fontSize: "15px",

};

// =====================================================
// IMAGE PREVIEW
// =====================================================

const previewImageStyle = {

  maxWidth: "92%",

  maxHeight: "92%",

  background: "#FFF",

  padding: "12px",

  borderRadius: "14px",

  boxShadow: "0 20px 45px rgba(0,0,0,.40)",

};

// =====================================================
// PAYMENT DETAILS
// =====================================================

const paymentInfoStyle = {

  marginTop: "12px",

  fontSize: "13px",

  color: "#555",

  lineHeight: "23px",

};

const transactionBoxStyle = {

  marginTop: "8px",

  padding: "12px",

  background: "#F7F7F7",

  borderRadius: "10px",

  wordBreak: "break-word",

};

const textareaStyle = {

  width: "100%",

  marginTop: "25px",

  height: "120px",

  padding: "15px",

  borderRadius: "10px",

  border: "1px solid #DDD",

  resize: "none",

  boxSizing: "border-box",

  fontSize: "15px",

};

// =====================================================
// FLEX HELPERS
// =====================================================

const flexColumn = {

  display: "flex",

  flexDirection: "column",

  gap: "10px",

};

const flexBetween = {

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

};

// =====================================================
// BADGE TEXT
// =====================================================

const badgeTextStyle = {

  fontWeight: "600",

  fontSize: "13px",

};
// =====================================================
// EXPORT
// =====================================================

export default Appointments;