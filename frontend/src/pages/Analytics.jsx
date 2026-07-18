import AdminLayout from "../components/admin/AdminLayout";

function Analytics() {
  return (
    <AdminLayout>
      <h1
        style={{
          color: "#47685F",
          marginBottom: "25px",
        }}
      >
        Analytics
      </h1>

      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "18px",
          textAlign: "center",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <h2>📊 Analytics Module</h2>

        <p>
          This feature will be added after deployment.
        </p>
      </div>
    </AdminLayout>
  );
}

export default Analytics;