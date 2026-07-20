import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyOTP() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOTP] = useState("");

  const verifyOTP = async () => {

    if (otp.length !== 6) {

      alert("Enter a valid 6-digit OTP.");

      return;

    }

    try {

      const res = await axios.post(
  `${API_URL}/api/password/verify-otp",
  {
    email,
    otp,
    role: "patient",
  }
);

      alert(res.data.message);

      navigate("/reset-password", {
        state: {
          email,
        },
      });

    }

    catch (err) {

      alert(
        err.response?.data?.message ||
        "Invalid OTP"
      );

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
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#47685F",
          }}
        >
          Verify OTP
        </h2>

        <input
          placeholder="Enter OTP"
          value={otp}
          maxLength={6}
          onChange={(e)=>setOTP(e.target.value)}
          style={{
            width:"100%",
            padding:"15px",
            marginTop:"30px",
            borderRadius:"10px",
            border:"1px solid #DDD",
            boxSizing:"border-box",
          }}
        />

        <button
          onClick={verifyOTP}
          style={{
            width:"100%",
            marginTop:"25px",
            padding:"15px",
            border:"none",
            borderRadius:"10px",
            background:"#47685F",
            color:"white",
            cursor:"pointer",
          }}
        >
          Verify OTP
        </button>

      </div>
    </div>
  );

}

export default VerifyOTP;