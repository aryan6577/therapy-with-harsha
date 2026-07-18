import { useState } from "react";
import harsha from "../assets/harsha.jpeg";
import AboutModal from "./AboutModal";
import AboutContent from "./AboutContent";
import { useNavigate } from "react-router-dom";
function About() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

const handleBookAppointment = () => {
  // Close the modal first
  setOpenModal(false);

  // Wait for the closing animation
  setTimeout(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/book");
    } else {
      navigate("/login");
    }
  }, 300);
};
  return (
    <>
      <section
        id="about"
        style={{
          scrollMarginTop: "10px",
          backgroundColor: "#FAF7F2",
          padding: "100px 80px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "80px",
          }}
        >
          {/* Left Image */}

          <div style={{ flex: 1 }}>
            <img
              src={harsha}
              alt="Harsha Aman"
              style={{
                width: "100%",
                borderRadius: "20px",
                objectFit: "cover",
                boxShadow: "0 20px 50px rgba(0,0,0,.12)",
              }}
            />
          </div>

          {/* Right Content */}

          <div style={{ flex: 1 }}>
            <h4
              style={{
                color: "#7E9A90",
                letterSpacing: "2px",
                marginBottom: "15px",
              }}
            >
              ABOUT ME
            </h4>

            <h2
              style={{
                fontSize: "48px",
                color: "#47685F",
                marginBottom: "25px",
                lineHeight: 1.2,
              }}
            >
              Compassionate Support For Your Mental Well-Being
            </h2>

            <p
              style={{
                fontSize: "18px",
                color: "#5F6468",
                lineHeight: "1.9",
                marginBottom: "25px",
              }}
            >
              Hi, I'm <strong>Harsha Aman</strong>—a psychologist and counselor
              passionate about helping people better understand themselves and
              navigate life's challenges with confidence.
            </p>

            <p
              style={{
                fontSize: "18px",
                color: "#5F6468",
                lineHeight: "1.9",
                marginBottom: "35px",
              }}
            >
              I work with students and young adults, providing a safe,
              supportive, and judgment-free space where healing,
              self-discovery, and personal growth can begin. My approach is
              rooted in empathy, curiosity, and the belief that meaningful
              change starts with feeling truly heard.
            </p>

            <button
              onClick={() => setOpenModal(true)}
              style={{
                backgroundColor: "#5F7F76",
                color: "white",
                border: "none",
                padding: "16px 32px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                transition: ".3s",
              }}
            >
              Read My Story →
            </button>
          </div>
        </div>
      </section>

<AboutModal
  open={openModal}
  onClose={() => setOpenModal(false)}
>
  <AboutContent
  onBookAppointment={handleBookAppointment}
/>
</AboutModal>
    </>
  );
}

export default About;