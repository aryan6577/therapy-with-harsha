import { FaBell, FaUserCircle } from "react-icons/fa";

function AdminTopbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "18px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
        marginBottom: "35px",
      }}
    >
      {/* Left */}
      <div>
        <h2
          style={{
            margin: 0,
            color: "#47685F",
          }}
        >
          Welcome Back, Harsha 👋
        </h2>

        <p
          style={{
            margin: "6px 0 0",
            color: "#777",
            fontSize: "15px",
          }}
        >
          {today}
        </p>
      </div>

      {/* Right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <FaBell
          size={22}
          color="#47685F"
          style={{ cursor: "pointer" }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaUserCircle size={36} color="#47685F" />

          <div>
            <div
              style={{
                fontWeight: "600",
                color: "#47685F",
              }}
            >
              Harsha
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#888",
              }}
            >
              Therapist
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTopbar;