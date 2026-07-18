import AdminLayout from "../components/admin/AdminLayout";

function Reviews() {
  return (
    <AdminLayout>
      <h1
        style={{
          color: "#47685F",
          marginBottom: "25px",
        }}
      >
        Reviews
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
        <h2>⭐ Reviews Module</h2>

        <p>
          This feature will be added after deployment.
        </p>
      </div>
    </AdminLayout>
  );
}

export default Reviews;