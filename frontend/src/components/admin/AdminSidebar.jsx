import { NavLink } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: "🏠",
  },
  {
    title: "Patients",
    path: "/admin/patients",
    icon: "👥",
  },
  {
    title: "Appointments",
    path: "/admin/appointments",
    icon: "📅",
  },
  {
  title: "Scheduling Center",
  path: "/admin/scheduling",
  icon: "🗓️",
},

  // NEW
  

  {
    title: "Reviews",
    path: "/admin/reviews",
    icon: "⭐",
  },
  {
    title: "Analytics",
    path: "/admin/analytics",
    icon: "📊",
  },
  {
    title: "Clinic Settings",
    path: "/admin/settings",
    icon: "🏥",
  },
];

function AdminSidebar() {
  return (
    <div
      style={{
        width: "270px",
        minHeight: "100vh",
        background: "#47685F",
        color: "white",
        padding: "35px 25px",
      }}
    >
      <h2
        style={{
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        Therapy With Harsha
      </h2>

      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            display: "block",
            padding: "14px 18px",
            marginBottom: "12px",
            borderRadius: "12px",
            textDecoration: "none",
            color: "white",
            background: isActive
              ? "#5D8076"
              : "transparent",
            fontWeight: "600",
          })}
        >
          {item.icon} {item.title}
        </NavLink>
      ))}

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        style={{
          marginTop: "50px",
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          background: "white",
          color: "#47685F",
          fontWeight: "700",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminSidebar;