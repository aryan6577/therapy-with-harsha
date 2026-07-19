import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../../config";
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async () => {
    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      // Login Request
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        formData
      );

    // ==========================
// Prevent Admin Login Here
// ==========================

if (res.data.user.role === "admin") {

  alert(
    "This is a therapist account.\n\nPlease use the Therapist Login page."
  );

  return;

}

// ==========================
// Save Login
// ==========================

localStorage.setItem(
  "token",
  res.data.token
);

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

// ==========================
// Check Intake Form
// ==========================

const profileRes = await axios.get(
  `${API_URL}/api/patient/profile`,
  {
    headers: {
      Authorization: `Bearer ${res.data.token}`,
    },
  }
);

// If no profile exists yet
if (!profileRes.data.profile) {
  navigate("/intake");
  return;
}

// If profile exists but not completed
if (!profileRes.data.profile.profileCompleted) {
  navigate("/intake");
  return;
}

// Profile completed
navigate("/dashboard");
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
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#FAF7F2",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#47685F",
          }}
        >
          Patient Login
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Login to manage your appointments.
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
        />
        <div
  style={{
    textAlign: "right",
    marginTop: "-10px",
    marginBottom: "20px",
  }}
>
  <Link
    to="/forgot-password"
    style={{
      color: "#47685F",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "14px",
    }}
  >
    Forgot Password?
  </Link>
</div>

        <button
          onClick={loginUser}
          style={buttonStyle}
        >
          Login
        </button>

        <p
          style={{
            marginTop: "25px",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#47685F",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  background: "#47685F",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
};

export default Login;