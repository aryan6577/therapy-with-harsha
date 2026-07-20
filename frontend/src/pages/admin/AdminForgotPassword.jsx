import { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function AdminForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
  "/password/forgot",
  {
    email,
    role: "admin",
  }
);

      alert(res.data.message);

      navigate("/admin-verify-otp", {
        state: {
          email,
        },
      });
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

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
          width: "430px",
          background: "white",
          padding: "40px",
          borderRadius: "18px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <h1
          style={{
            color: "#47685F",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Forgot Password
        </h1>

        <p
          style={{
            color: "#666",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Enter your therapist email to receive an OTP.
        </p>

        <input
          type="email"
          placeholder="Therapist Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={sendOTP}
          disabled={loading}
          style={{
            ...buttonStyle,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <span
            onClick={() =>
              navigate("/admin/login")
            }
            style={{
              color: "#47685F",
              cursor: "pointer",
              fontWeight: "600",
              textDecoration: "underline",
            }}
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #DDD",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  border: "none",
  borderRadius: "10px",
  background: "#47685F",
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};

export default AdminForgotPassword;