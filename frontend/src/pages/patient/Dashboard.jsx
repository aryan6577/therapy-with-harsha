import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  // ===========================
  // STATES
  // ===========================

  const [user, setUser] = useState(null);

  const [userName, setUserName] = useState("");

  const [profileExists, setProfileExists] =
    useState(false);

  const [patientProfile, setPatientProfile] =
    useState(null);
  const profileCompleted =
  profileExists &&
  patientProfile?.profileCompleted;
  const [latestAppointment, setLatestAppointment] =
    useState(null);

  // ===========================
  // INITIAL LOAD
  // ===========================

  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!storedUser) return;

    setUser(storedUser);

    setUserName(
      storedUser.fullName
        ? storedUser.fullName.split(" ")[0]
        : "Patient"
    );

    loadProfile();

    loadLatestAppointment(
      storedUser._id
    );

  }, []);

  // ===========================
  // LOAD PATIENT PROFILE
  // ===========================

  const loadProfile = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/api/patient/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("PROFILE RESPONSE:", res.data);

      setProfileExists(
  !!res.data.profile
);

if (res.data.profile) {

  // ============================
  // Block Dashboard if Intake
  // has not been completed
  // ============================

  if (!res.data.profile.profileCompleted) {

    navigate("/intake", {
      replace: true,
    });

    return;

  }

  setPatientProfile(
    res.data.profile
  );
  if (!res.data.profile) {

  navigate("/intake", {
    replace: true,
  });

  return;

}

  if (
    res.data.profile.fullName
  ) {

    setUserName(
      res.data.profile.fullName.split(" ")[0]
    );

  }

}

    } catch (err) {

      console.log(err);

    }

  };

  // ===========================
  // LOAD APPOINTMENTS
  // ===========================

  const loadLatestAppointment = async (
    userId
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/api/appointment",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const appointments =
        res.data.appointments.filter(
          (appointment) =>
            appointment.patient?._id ===
            userId
        );

      if (appointments.length > 0) {

        setLatestAppointment(
          appointments[0]
        );

      }

    } catch (err) {

      console.log(err);

    }

  };

  // ===========================
  // PAGE
  // ===========================

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#FAF7F2",
        padding: "50px",
      }}
    >

      <h1
        style={{
          color: "#47685F",
          fontSize: "40px",
          marginBottom: "10px",
        }}
      >
        Welcome, {userName} 👋
      </h1>

      <p
        style={{
          color: "#666",
          fontSize: "18px",
          marginBottom: "35px",
        }}
      >
        Welcome back to Therapy With Harsha.
      </p>
            {/* ========================= */}
      {/* Patient Information */}
      {/* ========================= */}

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          marginBottom: "35px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >

        <h2
          style={{
            color: "#47685F",
            marginBottom: "20px",
          }}
        >
          Patient Information
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >

          <InfoCard
            title="Patient ID"
            value={
              user?.patientId ||
              "Generating..."
            }
          />

          <InfoCard
            title="Email"
            value={
              patientProfile?.email ||
              user?.email ||
              "-"
            }
          />

          <InfoCard
            title="Phone"
            value={
              patientProfile?.phone ||
              user?.phone ||
              "Not Provided"
            }
          />

          <InfoCard
            title="Registered On"
            value={
              user?.createdAt
                ? new Date(
                    user.createdAt
                  ).toLocaleDateString()
                : "-"
            }
          />

        </div>

      </div>

      {/* ========================= */}
      {/* Dashboard Summary */}
      {/* ========================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",
          gap: "25px",
          marginBottom: "40px",
        }}
      >

        <SummaryCard
          title="📅 Next Appointment"
          value={
            latestAppointment
              ? `${latestAppointment.appointmentDate} • ${latestAppointment.appointmentTime}`
              : "No Appointment"
          }
        />

        <div
  onClick={() =>
  profileCompleted
    ? navigate("/profile")
    : navigate("/intake")
}
  style={{
    background: "white",
    borderRadius: "20px",
    padding: "30px",
    cursor: "pointer",
    transition: ".25s",
    boxShadow: "0 8px 22px rgba(0,0,0,.08)",
  }}
>
  <h3
    style={{
      color: "#47685F",
      marginBottom: "18px",
    }}
  >
    📋 Profile Status
  </h3>

  {profileCompleted ? (
    <div
      style={{
        color: "#2E7D32",
        fontWeight: "700",
        fontSize: "22px",
      }}
    >
      ✅ Completed
    </div>
  ) : (
    <>
      <div
        style={{
          color: "#D97706",
          fontWeight: "700",
          fontSize: "22px",
        }}
      >
        ⚠️ Incomplete
      </div>

      <button
        onClick={(e) => {
  e.stopPropagation();
  navigate("/intake");
}}
        style={{
          marginTop: "18px",
          background: "#47685F",
          color: "white",
          border: "none",
          borderRadius: "10px",
          padding: "12px 20px",
          cursor: "pointer",
          fontWeight: "600",
          transition: ".25s",
        }}
      >
        Complete Profile →
      </button>
    </>
  )}
</div>

        {latestAppointment ? (

  latestAppointment.status === "Approved" &&
  latestAppointment.paymentStatus === "Pending" ? (

    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "25px",
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          color: "#47685F",
          marginBottom: "15px",
        }}
      >
        💳 Payment
      </h3>

      <button
        onClick={() =>
          navigate(`/payment/${latestAppointment._id}`)
        }
        style={{
          background: "#47685F",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Pay Now
      </button>
    </div>

  ) : (

    <SummaryCard
      title="💳 Payment Status"
      value={latestAppointment.paymentStatus}
    />

  )

) : (

  <SummaryCard
    title="💳 Payment Status"
    value="No Appointment"
  />

)}

        <SummaryCard
          title="📌 Appointment Status"
          value={
            latestAppointment
              ? latestAppointment.status
              : "-"
          }
        />

      </div>

      {/* ========================= */}
      {/* Online Consultation */}
      {/* ========================= */}

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          marginBottom: "35px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,.08)",
        }}
      >

        <h2
          style={{
            color: "#47685F",
            marginBottom: "20px",
          }}
        >
          Online Consultation
        </h2>

        {latestAppointment ? (

          latestAppointment.paymentStatus === "Paid" &&
          latestAppointment.googleMeetLink ? (

            <>

              <p
                style={{
                  color: "#555",
                  marginBottom: "20px",
                }}
              >
                Your session is ready.
              </p>

              <a
                href={latestAppointment.googleMeetLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  background: "#47685F",
                  color: "white",
                  padding: "15px 28px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                🎥 Join Google Meet
              </a>

            </>

          ) : (

            <p
              style={{
                color: "#666",
                lineHeight: "28px",
              }}
            >
              Waiting for payment verification.
              <br />
              The Google Meet link will appear here once your payment has been verified.
            </p>

          )

        ) : (

          <p
            style={{
              color: "#666",
            }}
          >
            No upcoming appointment.
          </p>

        )}

      </div>

      {/* ========================= */}
      {/* Quick Actions */}
      {/* ========================= */}

      <h2
        style={{
          color: "#47685F",
          marginBottom: "20px",
        }}
      >
        Quick Actions
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "25px",
        }}
      >

        <ActionCard
          icon="📅"
          title="Book Appointment"
          onClick={() =>
            navigate("/book")
          }
        />

        <ActionCard
          icon="📖"
          title="Appointment History"
          onClick={() =>
            navigate("/history")
          }
        />

        <ActionCard
          icon="👤"
          title="My Profile"
          onClick={() =>
            navigate("/profile")
          }
        />

      </div>

    </div>

  );

}
function InfoCard({ title, value }) {

  return (

    <div
      style={{
        background: "#F8F8F8",
        borderRadius: "15px",
        padding: "20px",
      }}
    >

      <h4
        style={{
          color: "#47685F",
          marginBottom: "10px",
        }}
      >
        {title}
      </h4>

      <h3
        style={{
          margin: 0,
          color: "#333",
          wordBreak: "break-word",
        }}
      >
        {value}
      </h3>

    </div>

  );

}

function SummaryCard({

  title,

  value,

}) {

  return (

    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "25px",
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >

      <h3
        style={{
          color: "#47685F",
          marginBottom: "15px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "18px",
          color: "#555",
          margin: 0,
          fontWeight: "600",
        }}
      >
        {value}
      </p>

    </div>

  );

}

function ActionCard({

  icon,

  title,

  onClick,

}) {

  return (

    <div

      onClick={onClick}

      style={{

        background: "white",

        borderRadius: "20px",

        padding: "30px",

        cursor: "pointer",

        boxShadow:
          "0 10px 25px rgba(0,0,0,0.08)",

        transition: "0.25s",

      }}

      onMouseEnter={(e) => {

        e.currentTarget.style.transform =
          "translateY(-4px)";

      }}

      onMouseLeave={(e) => {

        e.currentTarget.style.transform =
          "translateY(0px)";

      }}

    >

      <h2
        style={{
          color: "#47685F",
          margin: 0,
        }}
      >
        {icon} {title}
      </h2>

    </div>

  );

}

export default Dashboard;