import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

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

  const loginAdmin = async () => {

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await axios.post(
  "/auth/login",
  formData
);

      if (res.data.user.role !== "admin") {
        alert("This is not a therapist account.");
        return;
      }

      localStorage.setItem(
        "token",
        res.data.token
      );

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
        height: "100vh",
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
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >

        <h1
          style={{
            textAlign: "center",
            color: "#47685F",
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
          name="email"
          placeholder="Email"
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

        <button
          onClick={loginAdmin}
          style={buttonStyle}
        >
          Login
        </button>

      </div>

    </div>

  );

}

const inputStyle = {

  width: "100%",
  padding: "14px",
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
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",

};

export default AdminLogin;