import {
  FaHome,
  FaCalendarAlt,
  FaClipboardList,
  FaStar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    { icon: <FaHome />, label: "Dashboard" },
    { icon: <FaCalendarAlt />, label: "Availability" },
    { icon: <FaClipboardList />, label: "Appointments" },
    { icon: <FaStar />, label: "Reviews" },
    { icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        background: "#47685F",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "35px 25px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          marginBottom: "45px",
          textAlign: "center",
          fontSize: "26px",
        }}
      >
        Therapy With Harsha
      </h2>

      <div style={{ flex: 1 }}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#5F7F76";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div style={{ fontSize: "18px" }}>{item.icon}</div>

            <div
              style={{
                fontSize: "17px",
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          padding: "15px",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          cursor: "pointer",
        }}
      >
        <FaSignOutAlt />
        Logout
      </div>
    </div>
  );
}

export default Sidebar;