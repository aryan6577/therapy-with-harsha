import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    setUser(storedUser);

  }, []);

  // ===========================
  // Dashboard Navigation
  // ===========================

  const handleDashboard = () => {

    if (!user) {

      navigate("/login");

      return;

    }

    if (user.role === "admin") {

      navigate("/admin/dashboard");

      return;

    }

    navigate("/dashboard");

  };

  // ===========================
  // Logout
  // ===========================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

    window.location.reload();

  };

  return (

    <nav
      style={{
        backgroundColor: "#FAF7F2",
        padding: "10px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #E9E2D8",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >

      {/* Logo */}

      <div>

        <img
          src={logo}
          alt="Therapy With Harsha"
          style={{
            height: "65px",
          }}
        />

      </div>

      {/* Navigation */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "35px",
          fontSize: "18px",
        }}
      >

        <button
  onClick={() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
  style={navButtonStyle}
>
  Home
</button>

        <button
  onClick={() =>
    document
      .getElementById("about")
      ?.scrollIntoView({
        behavior: "smooth",
      })
  }
  style={navButtonStyle}
>
  About
</button>

        <button
  onClick={() =>
    document
      .getElementById("services")
      ?.scrollIntoView({
        behavior: "smooth",
      })
  }
  style={navButtonStyle}
>
  Services
</button>

        <button
  onClick={() =>
    document
      .getElementById("contact")
      ?.scrollIntoView({
        behavior: "smooth",
      })
  }
  style={navButtonStyle}
>
  Contact
</button>

        {/* ========================= */}

        {!user ? (

          <button

            onClick={() =>
              navigate("/login")
            }

            style={buttonStyle}

          >

            Book Appointment

          </button>

        ) : (

          <>

            <button

              onClick={handleDashboard}

              style={buttonStyle}

            >

              {user.role === "admin"

                ? "Therapist Dashboard"

                : "Dashboard"}

            </button>

            <button

              onClick={handleLogout}

              style={logoutStyle}

            >

              Logout

            </button>

          </>

        )}

      </div>

    </nav>

  );

}

const linkStyle = {

  textDecoration: "none",

  color: "#2F3A37",

  fontWeight: "500",

};
const navButtonStyle = {
  background: "none",
  border: "none",
  color: "#2F3A37",
  fontWeight: "500",
  fontSize: "18px",
  cursor: "pointer",
  padding: 0,
};

const buttonStyle = {

  background: "#5F7F76",

  color: "white",

  border: "none",

  padding: "14px 22px",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "600",

};

const logoutStyle = {

  background: "#C96B6B",

  color: "white",

  border: "none",

  padding: "14px 22px",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "600",

};

export default Navbar;