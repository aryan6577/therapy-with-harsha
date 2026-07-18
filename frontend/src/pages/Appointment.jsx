function Appointment() {
  return (
    <section
      style={{
        backgroundColor: "#FAF7F2",
        minHeight: "100vh",
        padding: "100px 80px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "50px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#47685F",
            marginBottom: "15px",
            fontSize: "48px",
          }}
        >
          Book An Appointment
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#5F6468",
            marginBottom: "40px",
            lineHeight: "1.8",
          }}
        >
          Schedule your therapy session by filling out the details below.
        </p>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Full Name"
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Email Address"
            style={inputStyle}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#5F7F76",
              color: "white",
              border: "none",
              padding: "18px",
              borderRadius: "10px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Continue Booking
          </button>
        </form>
      </div>
    </section>
  );
}

const inputStyle = {
  padding: "18px",
  border: "1px solid #DADADA",
  borderRadius: "10px",
  fontSize: "16px",
  outline: "none",
};

export default Appointment;