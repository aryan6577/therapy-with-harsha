import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    try {

      setLoading(true);

      await axios.post(
  "/password/forgot",
  {
    email,
    role: "patient",
  }
);

      navigate("/verify-otp", {
        state: {
          email,
        },
      });

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAF7F2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "450px",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#47685F",
          }}
        >
          Forgot Password
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Enter your registered email.
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #DDD",
            marginBottom: "25px",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={sendOTP}
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            background: "#47685F",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading
              ? "not-allowed"
              : "pointer",
          }}
        >
          {loading
            ? "Sending OTP..."
            : "Send OTP"}
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;