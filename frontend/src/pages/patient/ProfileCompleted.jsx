import { useNavigate } from "react-router-dom";

function ProfileCompleted() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#FAF7F2",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "600px",
          background: "white",
          borderRadius: "20px",
          padding: "50px",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            fontSize: "70px",
            marginBottom: "20px",
          }}
        >
          ✅
        </div>

        <h1
          style={{
            color: "#47685F",
            marginBottom: "20px",
          }}
        >
          Profile Completed Successfully
        </h1>

        <p
          style={{
            color: "#666",
            lineHeight: "30px",
            marginBottom: "35px",
          }}
        >
          Thank you for completing your intake form.

          <br />

          Your information has been securely shared with your therapist.

          <br />

          You can now book your first therapy session.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "#47685F",
            color: "white",
            border: "none",
            padding: "16px 40px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "17px",
            fontWeight: "600",
          }}
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ProfileCompleted;