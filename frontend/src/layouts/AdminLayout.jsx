import Sidebar from "../components/Sidebar";
import AdminTopbar from "../components/AdminTopbar";

function AdminLayout({ children }) {
  return (
    <>
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
          background: "#FAF7F2",
          padding: "35px",
        }}
      >
        <AdminTopbar />

        {children}
      </div>
    </>
  );
}

export default AdminLayout;