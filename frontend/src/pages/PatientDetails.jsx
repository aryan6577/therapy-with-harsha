import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import AdminLayout from "../components/admin/AdminLayout";

function PatientDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadPatient();

  }, []);

  const loadPatient = async () => {

    try {

      const res = await axios.get(
        `/admin/patients/${id}`
      );

      setPatient(res.data);

    } catch (err) {

      alert("Unable to load patient.");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <AdminLayout>

        <div
          style={{
            padding: "60px",
            fontSize: "22px",
          }}
        >

          Loading Patient...

        </div>

      </AdminLayout>

    );

  }

  if (!patient) {

    return (

      <AdminLayout>

        <div
          style={{
            padding: "60px",
            fontSize: "22px",
          }}
        >

          Patient Not Found

        </div>

      </AdminLayout>

    );

  }

  const appointments =
    patient.appointments || [];

  const completed =
    appointments.filter(
      a => a.status === "Completed"
    ).length;

  const pending =
    appointments.filter(
      a => a.status === "Pending"
    ).length;

  const cancelled =
    appointments.filter(
      a => a.status === "Cancelled"
    ).length;

  const totalPaid =
    appointments
      .filter(
        a => a.paymentStatus === "Paid"
      )
      .reduce(
        (sum, a) =>
          sum + (a.paymentAmount || 0),
        0
      );

  return (

    <AdminLayout>

      <h1
        style={{
          color:"#47685F",
          marginBottom:"30px",
        }}
      >
        Patient Details
      </h1>
            {/* ============================== */}
      {/* Statistics */}
      {/* ============================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(200px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        <StatCard
          title="Total Sessions"
          value={appointments.length}
        />

        <StatCard
          title="Completed"
          value={completed}
        />

        <StatCard
          title="Pending"
          value={pending}
        />

        <StatCard
          title="Cancelled"
          value={cancelled}
        />

        <StatCard
          title="Revenue"
          value={`₹${totalPaid}`}
        />

      </div>

      {/* ============================== */}
      {/* Personal Information */}
      {/* ============================== */}

      <div style={cardStyle}>

        <h2 style={headingStyle}>
          👤 Personal Information
        </h2>

        <InfoRow
          label="Patient ID"
          value={patient.user?.patientId}
        />

        <InfoRow
          label="Full Name"
          value={patient.user?.fullName}
        />

        <InfoRow
          label="Email"
          value={patient.user?.email}
        />

        <InfoRow
          label="Phone"
          value={patient.user?.phone}
        />

        <InfoRow
          label="Gender"
          value={patient.profile?.gender}
        />

        <InfoRow
          label="Date of Birth"
          value={patient.profile?.dob}
        />

        <InfoRow
          label="Occupation"
          value={patient.profile?.occupation}
        />

        <InfoRow
          label="City"
          value={patient.profile?.city}
        />

      </div>

      {/* ============================== */}
      {/* Therapy Information */}
      {/* ============================== */}

      <div
        style={{
          ...cardStyle,
          marginTop: "30px",
        }}
      >

        <h2 style={headingStyle}>
          🧠 Therapy Information
        </h2>

        <InfoRow
          label="Reason"
          value={
            patient.profile?.reason ||
            patient.profile?.reasonForTherapy
          }
        />

        <InfoRow
          label="Previous Therapy"
          value={
            patient.profile?.previousTherapy
          }
        />

        <InfoRow
          label="Medication"
          value={
            patient.profile?.medication
          }
        />

        <InfoRow
          label="Medical Condition"
          value={
            patient.profile?.medicalCondition
          }
        />

        <InfoRow
          label="Emergency Contact"
          value={
            patient.profile?.emergencyName ||
            patient.profile?.emergencyContactName
          }
        />

        <InfoRow
          label="Emergency Phone"
          value={
            patient.profile?.emergencyPhone ||
            patient.profile?.emergencyContactNumber
          }
        />

      </div>
            {/* ============================== */}
      {/* Appointment History */}
      {/* ============================== */}

      <div
        style={{
          ...cardStyle,
          marginTop: "30px",
        }}
      >

        <h2 style={headingStyle}>
          📅 Appointment History
        </h2>

        {appointments.length === 0 ? (

          <div
            style={{
              padding: "30px",
              color: "#777",
              textAlign: "center",
            }}
          >
            No appointments available.
          </div>

        ) : (

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >

            <thead>

              <tr>

                <th style={thStyle}>
                  Appointment ID
                </th>

                <th style={thStyle}>
                  Date
                </th>

                <th style={thStyle}>
                  Time
                </th>

                <th style={thStyle}>
                  Status
                </th>

                <th style={thStyle}>
                  Payment
                </th>

                <th style={thStyle}>
                  Amount
                </th>

                <th style={thStyle}>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {appointments.map((appointment) => (

                <tr key={appointment._id}>

                  <td style={tdStyle}>
                    {appointment.appointmentId}
                  </td>

                  <td style={tdStyle}>
                    {appointment.appointmentDate}
                  </td>

                  <td style={tdStyle}>
                    {appointment.appointmentTime}
                  </td>

                  <td style={tdStyle}>

                    <Badge
                      status={appointment.status}
                    />

                  </td>

                  <td style={tdStyle}>

                    <Badge
                      status={
                        appointment.paymentStatus
                      }
                    />

                  </td>

                  <td style={tdStyle}>
                    ₹
                    {appointment.paymentAmount || 0}
                  </td>

                  <td style={tdStyle}>

                    <button
                      style={viewButton}
                      onClick={() =>
                        navigate(
                          "/admin/appointments/" +
                          appointment._id
                        )
                      }
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* ============================== */}
      {/* Payment Summary */}
      {/* ============================== */}

      <div
        style={{
          ...cardStyle,
          marginTop: "30px",
        }}
      >

        <h2 style={headingStyle}>
          💳 Payment Summary
        </h2>

        <InfoRow
          label="Total Revenue"
          value={`₹${totalPaid}`}
        />

        <InfoRow
          label="Paid Sessions"
          value={
            appointments.filter(
              a => a.paymentStatus === "Paid"
            ).length
          }
        />

        <InfoRow
          label="Pending Payments"
          value={
            appointments.filter(
              a =>
                a.paymentStatus === "Pending" ||
                a.paymentStatus === "Submitted"
            ).length
          }
        />

      </div>
            {/* ============================== */}
      {/* Quick Actions */}
      {/* ============================== */}

      <div
        style={{
          ...cardStyle,
          marginTop: "30px",
        }}
      >
        <h2 style={headingStyle}>
          ⚙️ Quick Actions
        </h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <button
            style={actionButton}
            onClick={() =>
              navigate("/book")
            }
          >
            📅 Book Appointment
          </button>

          <button
            style={actionButton}
            onClick={() =>
              navigate(
                "/admin/appointments"
              )
            }
          >
            📋 View All Appointments
          </button>

          <button
            style={actionButton}
            onClick={() =>
              window.location.href =
                `mailto:${patient.user?.email}`
            }
          >
            📧 Send Email
          </button>

          <button
            style={actionButton}
            onClick={() =>
              window.open(
                `tel:${patient.user?.phone}`
              )
            }
          >
            📞 Call Patient
          </button>
        </div>
      </div>

      {/* ============================== */}
      {/* Patient Timeline */}
      {/* ============================== */}

      <div
        style={{
          ...cardStyle,
          marginTop: "30px",
        }}
      >
        <h2 style={headingStyle}>
          📋 Patient Timeline
        </h2>

        <TimelineRow
          title="Patient Registered"
          value={
            patient.user?.createdAt
              ? new Date(
                  patient.user.createdAt
                ).toLocaleString()
              : "-"
          }
        />

        <TimelineRow
          title="Profile Completed"
          value={
            patient.profile?.createdAt
              ? new Date(
                  patient.profile.createdAt
                ).toLocaleString()
              : "Not Completed"
          }
        />

        <TimelineRow
          title="Appointments"
          value={`${appointments.length} Total`}
        />

        <TimelineRow
          title="Completed Sessions"
          value={completed}
        />

        <TimelineRow
          title="Total Paid"
          value={`₹${totalPaid}`}
        />
      </div>

    </AdminLayout>

  );

}

/* ===================================== */
/* Components */
/* ===================================== */

function StatCard({ title, value }) {

  return (

    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "25px",
        boxShadow:
          "0 8px 20px rgba(0,0,0,.08)",
      }}
    >
      <h4
        style={{
          color: "#777",
          marginBottom: "10px",
        }}
      >
        {title}
      </h4>

      <h1
        style={{
          margin: 0,
          color: "#47685F",
        }}
      >
        {value}
      </h1>
    </div>

  );

}

function InfoRow({ label, value }) {

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "14px 0",
        borderBottom: "1px solid #EEE",
      }}
    >
      <strong>{label}</strong>

      <div>
        {value || "Not Available"}
      </div>
    </div>

  );

}

function TimelineRow({
  title,
  value,
}) {

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 0",
        borderBottom: "1px solid #EEE",
      }}
    >
      <strong>{title}</strong>

      <span>{value}</span>
    </div>

  );

}

function Badge({ status }) {

  let color = "#777";

  switch (status) {

    case "Pending":
      color = "#F4B400";
      break;

    case "Approved":
      color = "#34A853";
      break;

    case "Completed":
      color = "#1976D2";
      break;

    case "Cancelled":
      color = "#EA4335";
      break;

    case "Paid":
      color = "#2E7D32";
      break;

    case "Submitted":
      color = "#1565C0";
      break;

    default:
      color = "#757575";

  }

  return (
    <span
      style={{
        background: color,
        color: "white",
        padding: "7px 14px",
        borderRadius: "20px",
        fontWeight: "600",
      }}
    >
      {status}
    </span>
  );

}
/* ===================================== */
/* Styles */
/* ===================================== */

const cardStyle = {
  background: "white",
  borderRadius: "20px",
  padding: "30px",
  boxShadow: "0 10px 25px rgba(0,0,0,.08)",
};

const headingStyle = {
  color: "#47685F",
  marginBottom: "25px",
};

const thStyle = {
  background: "#47685F",
  color: "white",
  padding: "14px",
  textAlign: "left",
  fontWeight: "600",
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #EEE",
};

const actionButton = {
  background: "#47685F",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
};

const viewButton = {
  background: "#1565C0",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

export default PatientDetails;