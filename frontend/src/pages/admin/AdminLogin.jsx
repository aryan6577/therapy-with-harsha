import { useState } from "react";
import axios from "axios";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
  `${API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      if (res.data.user.role !== "admin") {
        alert("Please use the Patient Login page.");
        return;
      }

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/admin/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login Failed"
      );
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
          }}
        >
          Therapist Login
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Therapy With Harsha Admin Portal
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={login}
          style={buttonStyle}
        >
          Login
        </button>

        <div
          style={{
            marginTop: "18px",
            textAlign: "center",
          }}
        >
          <span
            onClick={() =>
              navigate("/admin-forgot-password")
            }
            style={{
              color: "#47685F",
              fontWeight: "600",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Forgot Password?
          </span>
        </div>
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

export default AdminLogin;