import { useState } from "react";
import { sendContactMessage } from "../services/contactService";

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.message
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {

      setLoading(true);

      await sendContactMessage(form);

      alert(
        "Message sent successfully."
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
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

    <section
      id="contact"
      style={{
        backgroundColor: "#F7F3EE",
        padding: "100px 80px",
      }}
    >

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          gap: "60px",
          alignItems: "flex-start",
        }}
      >

        {/* Left Side */}

        <div
          style={{
            flex: 1,
          }}
        >

          <h4
            style={{
              color: "#7E9A90",
              letterSpacing: "2px",
              marginBottom: "15px",
            }}
          >
            CONTACT
          </h4>

          <h2
            style={{
              fontSize: "48px",
              color: "#47685F",
              marginBottom: "25px",
            }}
          >
            Start Your Journey Towards Better Mental Well-Being
          </h2>

          <p
            style={{
              color: "#5F6468",
              lineHeight: "1.8",
              marginBottom: "35px",
              fontSize: "18px",
            }}
          >
            Reach out to schedule a confidential therapy
            session. Support is available for individuals,
            children and adolescents.
          </p>

          <div
            style={{
              lineHeight: "2.2",
              color: "#47685F",
            }}
          >

            <p>
              <strong>📧 Email:</strong>
              {" "}
              therapy.harsha@gmail.com
            </p>

            <p>
              <strong>📞 Phone:</strong>
              {" "}
              +91 7488158989
            </p>

            <p>
              <strong>🌐 Mode:</strong>
              {" "}
              Online Sessions Only
            </p>

          </div>

        </div>

        {/* Right Side */}

        <div
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: "35px",
            borderRadius: "20px",
            boxShadow:
              "0 5px 20px rgba(0,0,0,0.05)",
          }}
        >

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              style={inputStyle}
            />

            <textarea
              rows="5"
              name="message"
              placeholder="How can I help you?"
              value={form.message}
              onChange={handleChange}
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#5F7F76",
                color: "white",
                border: "none",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "18px",
                cursor: "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {
                loading
                  ? "Sending..."
                  : "Send Message"
              }
            </button>

          </form>

        </div>

      </div>

    </section>

  );

}

const inputStyle = {

  padding: "16px",

  borderRadius: "12px",

  border: "1px solid #D9D9D9",

  fontSize: "16px",

  outline: "none",

};

export default Contact;