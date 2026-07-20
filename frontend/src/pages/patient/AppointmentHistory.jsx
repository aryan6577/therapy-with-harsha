import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
  "/appointment",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 22,
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAF7F2",
        padding: "40px",
      }}
    >
      <h1
        style={{
          color: "#47685F",
          marginBottom: "30px",
        }}
      >
        Appointment History
      </h1>

      {appointments.length === 0 && (
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          No appointments found.
        </div>
      )}

      {appointments.map((appointment) => (
        <div
          key={appointment._id}
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "25px",
            marginBottom: "25px",
            boxShadow: "0 8px 20px rgba(0,0,0,.08)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "15px",
            }}
          >
            <Info
              title="Appointment ID"
              value={appointment.appointmentId}
            />

            <Info
              title="Date"
              value={appointment.appointmentDate}
            />

            <Info
              title="Time"
              value={appointment.appointmentTime}
            />

            <Info
  title="Consultation"
  value={appointment.appointmentType}
/>

            <Info
              title="Status"
              value={appointment.status}
            />

            <Info
              title="Payment"
              value={appointment.paymentStatus}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "25px",
            }}
          >
            {appointment.googleMeetLink && (
  <a
    href={appointment.googleMeetLink}
    target="_blank"
    rel="noreferrer"
    style={button}
  >
    🎥 Join Google Meet
  </a>
)}

            {appointment.therapistNotes && (
  <button style={button}>
    📄 View Clinical Notes
  </button>
)}
          </div>
        </div>
      ))}
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div>
      <div
        style={{
          color: "#888",
          fontSize: 14,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontWeight: "600",
          marginTop: "5px",
          color: "#333",
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}

const button = {
  background: "#47685F",
  color: "white",
  textDecoration: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
};

export default AppointmentHistory;