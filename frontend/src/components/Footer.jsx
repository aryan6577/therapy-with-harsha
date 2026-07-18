import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#47685F",
        color: "white",
        padding: "70px 80px 30px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "60px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        {/* Brand */}

        <div style={{ flex: 1, minWidth: "250px" }}>
          <h2
            style={{
              marginBottom: "20px",
              fontSize: "30px",
            }}
          >
            Therapy With Harsha
          </h2>

          <p
            style={{
              lineHeight: "1.8",
              color: "#E5E5E5",
            }}
          >
            Compassionate psychological support for
            individuals, children and adolescents.
            Creating a safe space for healing,
            growth and emotional well-being.
          </p>
        </div>

        {/* Quick Links */}

        <div style={{ minWidth: "180px" }}>
          <h3 style={{ marginBottom: "20px" }}>
            Quick Links
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <a href="#home" style={linkStyle}>
              Home
            </a>

            <a href="#about" style={linkStyle}>
              About
            </a>

            <a href="#services" style={linkStyle}>
              Services
            </a>

            <a href="#contact" style={linkStyle}>
              Contact
            </a>

            <Link
              to="/admin/login"
              style={linkStyle}
            >
              Therapist Login
            </Link>
          </div>
        </div>

        {/* Contact */}

        <div style={{ minWidth: "250px" }}>
          <h3 style={{ marginBottom: "20px" }}>
            Contact
          </h3>

          <p style={{ marginBottom: "12px" }}>
            <a
              href="mailto:therapy.harsha@gmail.com"
              style={linkStyle}
            >
              📧 therapy.harsha@gmail.com
            </a>
          </p>

          <p style={{ marginBottom: "12px" }}>
            <a
              href="tel:+917488158989"
              style={linkStyle}
            >
              📞 +91 7488158989
            </a>
          </p>

          <p>
            🌐 Online Sessions Only
          </p>
        </div>
      </div>

      <hr
        style={{
          border: "none",
          borderTop:
            "1px solid rgba(255,255,255,.2)",
          marginBottom: "20px",
        }}
      />

      <p
        style={{
          textAlign: "center",
          color: "#DADADA",
          fontSize: "14px",
        }}
      >
        © 2026 Therapy With Harsha.
        All Rights Reserved.
      </p>
    </footer>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  transition: "0.3s",
};

export default Footer;