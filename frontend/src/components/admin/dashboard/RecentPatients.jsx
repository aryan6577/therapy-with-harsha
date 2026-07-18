import { useNavigate } from "react-router-dom";

function PatientCard({ patient }) {

  const navigate = useNavigate();

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 0",
        borderBottom: "1px solid #EEE",
      }}
    >

      <div>

        <h3
          style={{
            margin: 0,
            color: "#47685F",
          }}
        >
          {patient.user.fullName}
        </h3>

        <p
          style={{
            marginTop: "6px",
            color: "#777",
          }}
        >
          {patient.user.patientId}
        </p>

      </div>

      <button
        onClick={() =>
          navigate(
            "/admin/patients/" +
            patient.user._id
          )
        }
        style={{
          background: "#47685F",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        View
      </button>

    </div>

  );

}

function RecentPatients({ patients }) {

  return (

    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "30px",
        boxShadow:
          "0 10px 25px rgba(0,0,0,.08)",
      }}
    >

      <h2
        style={{
          color: "#47685F",
          marginBottom: "25px",
        }}
      >
        👥 Recent Patients
      </h2>

      {

        patients.length === 0 ?

        (

          <div
            style={{
              padding: "35px",
              textAlign: "center",
              color: "#888",
            }}
          >

            No Patients Found

          </div>

        )

        :

        patients

        .slice(-6)

        .reverse()

        .map(

          patient => (

            <PatientCard

              key={patient.user._id}

              patient={patient}

            />

          )

        )

      }

    </div>

  );

}

export default RecentPatients;