import { useNavigate } from "react-router-dom";

function Badge({ status }) {
  let background = "#F3F4F6";
  let color = "#555";

  switch (status) {
    case "Pending":
      background = "#FEF3C7";
      color = "#92400E";
      break;

    case "Approved":
      background = "#DCFCE7";
      color = "#166534";
      break;

    case "Rejected":
      background = "#FEE2E2";
      color = "#991B1B";
      break;

    case "Completed":
      background = "#DBEAFE";
      color = "#1D4ED8";
      break;

    case "Submitted":
      background = "#FEF3C7";
      color = "#92400E";
      break;

    case "Paid":
      background = "#DCFCE7";
      color = "#166534";
      break;

    default:
      background = "#F3F4F6";
      color = "#555";
  }

  return (
    <span
      style={{
        background,
        color,
        padding: "6px 14px",
        borderRadius: "25px",
        fontWeight: "600",
        fontSize: "14px",
      }}
    >
      {status}
    </span>
  );
}

function QueueCard({
  appointment,
  onApprove,
  onReject,
  onReschedule,
}) {

  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "22px",
        marginBottom: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "#47685F",
            }}
          >
            {appointment.patient?.fullName}
          </h2>

          <p
            style={{
              marginTop: "8px",
              color: "#666",
            }}
          >
            {appointment.patient?.patientId}
          </p>
        </div>

        <Badge status={appointment.status} />
      </div>

      <div
        style={{
          display: "flex",
          gap: "25px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <span>
          📅 {appointment.appointmentDate}
        </span>

        <span>
          ⏰ {appointment.appointmentTime}
        </span>

        <Badge
          status={appointment.paymentStatus}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "25px",
        }}
      >
        <button
          style={approveButton}
          onClick={() =>
            onApprove(appointment)
          }
        >
          ✓ Approve
        </button>

        <button
          style={rejectButton}
          onClick={() =>
            onReject(appointment)
          }
        >
          ✕ Reject
        </button>

        <button
          style={orangeButton}
          onClick={() =>
            onReschedule(appointment)
          }
        >
          ↺ Reschedule
        </button>

        <button
          style={blueButton}
          onClick={() =>
            navigate(
              "/admin/appointments/" +
                appointment._id
            )
          }
        >
          👁 View
        </button>

        <button
          style={purpleButton}
          onClick={() =>
            navigate(
              "/admin/patients/" +
                appointment.patient._id
            )
          }
        >
          👤 Patient
        </button>
      </div>
    </div>
  );
}

const approveButton = {
  background: "#22C55E",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};

const rejectButton = {
  background: "#EF4444",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};

const orangeButton = {
  background: "#F59E0B",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};

const blueButton = {
  background: "#47685F",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};

const purpleButton = {
  background: "#7C3AED",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};

export default QueueCard;