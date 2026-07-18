import { useNavigate } from "react-router-dom";

function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#FAF7F2",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            color: "#47685F",
          }}
        >
          🎉 Appointment Booked
        </h1>

        <p
          style={{
            marginTop: "20px",
            color: "#666",
          }}
        >
          Your appointment request has been submitted.
          <br />
          Your therapist will review and approve it.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "30px",
            padding: "15px 35px",
            border: "none",
            borderRadius: "10px",
            background: "#47685F",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default BookingSuccess;