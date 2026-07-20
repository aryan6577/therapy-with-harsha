import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.png";

function Hero() {

  const navigate = useNavigate();

const handleBookSession = () => {

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

  if (user.role === "admin") {
    navigate("/admin/dashboard");
    return;
  }

  // Logged in patient
  navigate("/dashboard");

};

  return (
    <section
      id="home"
      style={{
        scrollMarginTop: "100px",
        backgroundColor: "#FAF7F2",
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px",
        gap: "50px",
      }}
    >
      {/* Left Content */}

      <div
        style={{
          flex: 1,
          maxWidth: "650px",
        }}
      >
        <h1
          style={{
            fontSize: "54px",
            color: "#47685F",
            lineHeight: "1.25",
            marginBottom: "25px",
            fontWeight: "700",
            maxWidth: "700px",
          }}
        >
          A Safe Space For Healing, Growth & Emotional Well-Being
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#5F6468",
            lineHeight: "1.8",
            marginBottom: "40px",
          }}
        >
          Professional online therapy for individuals,
          children and adolescents.
          Compassionate support to help you navigate
          life's challenges with confidence,
          emotional resilience, and clarity.
        </p>

        <button
          onClick={handleBookSession}
          style={{
            backgroundColor: "#5F7F76",
            color: "white",
            border: "none",
            padding: "16px 32px",
            borderRadius: "12px",
            fontSize: "17px",
            fontWeight: "500",
            cursor: "pointer",
            boxShadow:
              "0 6px 18px rgba(95,127,118,0.20)",
            transition: "0.3s",
          }}
        >
          Book Your Session
        </button>
      </div>

      {/* Right Image */}

      <div
        style={{
          flex: 0.9,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={hero}
          alt="Therapy Illustration"
          style={{
            width: "100%",
            maxWidth: "420px",
            height: "auto",
            objectFit: "contain",
            animation:
              "float 6s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}

export default Hero;