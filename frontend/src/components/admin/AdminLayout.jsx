import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F5F5F5",
      }}
    >
      <AdminSidebar />

      <div
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;