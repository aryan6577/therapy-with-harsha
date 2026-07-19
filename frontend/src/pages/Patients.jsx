import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";

function Patients() {
  const [patients, setPatients] = useState([]);
const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadPatients();
  }, []);

const loadPatients = async () => {

  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(

      "${API_URL}/api/admin/patients",

      {

        headers: {

          Authorization: `Bearer ${token}`,

        },

      }

    );

    setPatients(res.data.patients);

  }

  catch (err) {

    console.log(err);

  }

};
const deletePatient = async (patient) => {

  const firstConfirm = window.confirm(

`Delete Patient Record?

Patient : ${patient.user.fullName}

This will permanently delete the patient account.`

  );

  if (!firstConfirm) return;

  const secondConfirm = window.confirm(

`FINAL CONFIRMATION

This action CANNOT be undone.

The following will be permanently deleted:

• Patient Login
• Patient Profile
• All Appointments
• Clinical Notes
• Payment Records
• Payment Screenshots
• Google Meet Events

Are you absolutely sure?`

  );

  if (!secondConfirm) return;

  try {

    setDeleting(true);

    const token = localStorage.getItem("token");

    const res = await axios.delete(

      `${API_URL}/api/admin/patients/${patient.user._id}`,

      {

        headers: {

          Authorization: `Bearer ${token}`,

        },

      }

    );

    alert(res.data.message);

    loadPatients();

  }

  catch (err) {

    alert(

      err.response?.data?.message ||

      "Unable to delete patient."

    );

  }

  finally {

    setDeleting(false);

  }

};

  return (
    <AdminLayout>
      <h1
        style={{
          color: "#47685F",
          marginBottom: "30px",
        }}
      >
        Patients
      </h1>

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#47685F",
              color: "white",
            }}
          >
            <tr>
              <th style={{ ...th, textAlign: "left" }}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Phone</th>
              <th style={th}>Intake</th>
              <th style={th}>Appointments</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient.user._id}>
                <td
                  style={{
                    ...td,
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  {patient.user.fullName}
                </td>

                <td style={td}>
                  {patient.user.email}
                </td>

                <td style={td}>
                  {patient.user.phone || "Not Provided"}
                </td>

                <td style={td}>
                  {patient.profile ? "✅ Completed" : "❌ Pending"}
                </td>

                <td style={td}>
                  {patient.totalAppointments}
                </td>

                <td style={td}>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      flexWrap: "wrap",
    }}
  >
    <button
      onClick={() =>
        navigate(
          `/admin/patients/${patient.user._id}`
        )
      }
      style={buttonStyle}
    >
      View
    </button>

    <button
      disabled={deleting}
      onClick={() =>
        deletePatient(patient)
      }
      style={{
        background: "#DC2626",
        color: "white",
        border: "none",
        padding: "8px 18px",
        borderRadius: "8px",
        cursor: deleting
          ? "not-allowed"
          : "pointer",
        fontWeight: "600",
        opacity: deleting ? 0.7 : 1,
      }}
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  </div>
</td>
              </tr>
            ))}

            {patients.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#888",
                  }}
                >
                  No patients registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

const th = {
  padding: "18px",
  textAlign: "center",
  fontSize: "16px",
};

const td = {
  padding: "18px",
  textAlign: "center",
  borderBottom: "1px solid #EEE",
  verticalAlign: "middle",
};

const buttonStyle = {
  background: "#47685F",
  color: "white",
  border: "none",
  padding: "8px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

export default Patients;