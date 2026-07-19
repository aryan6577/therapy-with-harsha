import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AppointmentDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [appointment, setAppointment] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // LOAD APPOINTMENT
  // =====================================

  const loadAppointment = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res =
        await axios.get(

          `${API_URL}/api/appointment/${id}`,

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

      if (res.data.success) {

        setAppointment(
          res.data.appointment
        );

      }

    }

    catch (err) {

      console.log(err);

      alert(
        "Unable to load appointment."
      );

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadAppointment();

  }, []);

  if (loading) {

    return (

      <div
        style={{
          padding: "50px",
          fontSize: "22px",
        }}
      >

        Loading Appointment...

      </div>

    );

  }

  if (!appointment) {

    return (

      <div
        style={{
          padding: "50px",
          fontSize: "22px",
        }}
      >

        Appointment not found.

      </div>

    );

  }
    // =====================================
  // RETURN
  // =====================================

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#F5F6FA",
        padding: "35px",
      }}
    >

      {/* ============================== */}
      {/* HEADER */}
      {/* ============================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "35px",
        }}
      >

        <div>

          <h1
            style={{
              margin: 0,
              color: "#47685F",
              fontSize: "34px",
            }}
          >
            Appointment Details
          </h1>

          <p
            style={{
              color: "#777",
              marginTop: "8px",
            }}
          >
            Complete appointment information
          </p>

        </div>

        <button

          style={backButton}

          onClick={()=>

            navigate("/admin/appointments")

          }

        >

          ← Back

        </button>

      </div>

      {/* ============================== */}
      {/* SUMMARY */}
      {/* ============================== */}

      <div

        style={summaryCard}

      >

        <SummaryItem

          title="Appointment ID"

          value={appointment.appointmentId}

        />

        <SummaryItem

          title="Status"

          value={appointment.status}

        />

        <SummaryItem

          title="Payment"

          value={appointment.paymentStatus}

        />

        <SummaryItem

          title="Date"

          value={appointment.appointmentDate}

        />

        <SummaryItem

          title="Time"

          value={appointment.appointmentTime}

        />

        <SummaryItem

          title="Therapist"

          value={appointment.therapist}

        />

        <SummaryItem

          title="Duration"

          value={`${appointment.appointmentDuration} Minutes`}

        />

        <SummaryItem

          title="Session"

          value={appointment.sessionType}

        />

      </div>

      {/* ============================== */}
      {/* PATIENT DETAILS */}
      {/* ============================== */}

      <div style={card}>

        <h2 style={sectionHeading}>

          Patient Details

        </h2>

        <div style={grid}>

          <SummaryItem

            title="Patient ID"

            value={appointment.patient?.patientId}

          />

          <SummaryItem

            title="Full Name"

            value={appointment.patient?.fullName}

          />

          <SummaryItem

            title="Email"

            value={appointment.patient?.email}

          />

          <SummaryItem

            title="Phone"

            value={appointment.patient?.phone}

          />

        </div>

      </div>
            {/* ============================== */}
      {/* APPOINTMENT DETAILS */}
      {/* ============================== */}

      <div style={card}>

        <h2 style={sectionHeading}>
          Appointment Information
        </h2>

        <div style={grid}>

          <SummaryItem
            title="Appointment Type"
            value={appointment.appointmentType}
          />

          <SummaryItem
            title="Session Type"
            value={appointment.sessionType}
          />

          <SummaryItem
            title="Consultation Fee"
            value={`₹${appointment.paymentAmount}`}
          />

          <SummaryItem
            title="Payment Status"
            value={appointment.paymentStatus}
          />

          <SummaryItem
            title="Approved By"
            value={
              appointment.approvedBy || "-"
            }
          />

          <SummaryItem
            title="Approved At"
            value={
              appointment.approvedAt || "-"
            }
          />

        </div>

      </div>

      {/* ============================== */}
      {/* PRESENTING CONCERN */}
      {/* ============================== */}

      <div style={card}>

        <h2 style={sectionHeading}>
          Presenting Concern
        </h2>

        <div
          style={{
            marginTop: "18px",
            lineHeight: "30px",
            color: "#555",
            fontSize: "16px",
            whiteSpace: "pre-wrap",
          }}
        >

          {appointment.concern ||
            "No concern provided."}

        </div>

      </div>

      {/* ============================== */}
      {/* PAYMENT DETAILS */}
      {/* ============================== */}

      <div style={card}>

        <h2 style={sectionHeading}>
          Payment Details
        </h2>

        <div style={grid}>

          <SummaryItem
            title="Payment Status"
            value={appointment.paymentStatus}
          />

          <SummaryItem
            title="Transaction ID"
            value={
              appointment.transactionId ||
              "-"
            }
          />

          <SummaryItem
            title="Submitted At"
            value={
              appointment.paymentSubmittedAt ||
              "-"
            }
          />

          <SummaryItem
            title="Verified At"
            value={
              appointment.paymentVerifiedAt ||
              "-"
            }
          />

        </div>

        {

          appointment.paymentScreenshot &&

          <div
            style={{
              marginTop: "30px",
            }}
          >

            <h3
              style={{
                color: "#47685F",
              }}
            >

              Payment Screenshot

            </h3>

            <img

              src={`${API_URL}/${appointment.paymentScreenshot}`}

              alt="Payment"

              style={{

                width: "350px",

                borderRadius: "12px",

                marginTop: "15px",

                border:
                  "1px solid #DDD",

              }}

            />

          </div>

        }

      </div>
            {/* ============================== */}
      {/* GOOGLE MEET */}
      {/* ============================== */}

      <div style={card}>

        <h2 style={sectionHeading}>
          Google Meet
        </h2>

        {

          appointment.googleMeetLink ?

          <div
            style={{
              marginTop: "20px",
            }}
          >

            <input

              value={
                appointment.googleMeetLink
              }

              readOnly

              style={linkInput}

            />

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                gap: "15px",
              }}
            >

              <button

                style={meetButton}

                onClick={()=>

                  window.open(

                    appointment.googleMeetLink,

                    "_blank"

                  )

                }

              >

                🎥 Join Meet

              </button>

              <button

                style={copyButton}

                onClick={() => {

                  navigator.clipboard.writeText(

                    appointment.googleMeetLink

                  );

                  alert("Copied");

                }}

              >

                📋 Copy Link

              </button>

            </div>

          </div>

          :

          <p
            style={{
              color:"#777",
            }}
          >

            Google Meet has not been generated yet.

          </p>

        }

      </div>

      {/* ============================== */}
      {/* ADMIN ACTIONS */}
      {/* ============================== */}

      <div style={card}>

        <h2 style={sectionHeading}>
          Therapist Actions
        </h2>

        <div
          style={{
            display:"flex",
            flexWrap:"wrap",
            gap:"15px",
            marginTop:"25px",
          }}
        >

          {

            appointment.status==="Pending"

            &&

            <button

              style={approveButton}

              onClick={async()=>{

                const token =
                  localStorage.getItem("token");

                await axios.put(

                  `${API_URL}/api/appointment/approve/${appointment._id}`,

                  {},

                  {

                    headers:{

                      Authorization:
                        `Bearer ${token}`

                    }

                  }

                );

                loadAppointment();

              }}

            >

              ✅ Approve

            </button>

          }

          {

            appointment.status==="Pending"

            &&

            <button

              style={rejectButton}

              onClick={async()=>{

                const reason=
                  prompt(
                    "Reason"
                  );

                if(reason===null)
                  return;

                const token=
                  localStorage.getItem("token");

                await axios.put(

                  `${API_URL}/api/appointment/reject/${appointment._id}`,

                  {reason},

                  {

                    headers:{

                      Authorization:
                        `Bearer ${token}`

                    }

                  }

                );

                loadAppointment();

              }}

            >

              ❌ Reject

            </button>

          }

          {

            appointment.paymentStatus==="Submitted"

            &&

            <button

              style={verifyButton}

              onClick={async()=>{

                const token=
                  localStorage.getItem("token");

                await axios.put(

                  `${API_URL}/api/appointment/verify-payment/${appointment._id}`,

                  {},

                  {

                    headers:{

                      Authorization:
                        `Bearer ${token}`

                    }

                  }

                );

                loadAppointment();

              }}

            >

              💳 Verify Payment

            </button>

          }

          {

            appointment.status==="Approved"

            &&

            <button

              style={notesButton}

              onClick={()=>

                navigate(

                  `/admin/clinical/${appointment._id}`

                )

              }

            >

              📝 Clinical Notes

            </button>

          }

          {

            appointment.status==="Approved"

            &&

            <button

              style={completeButton}

              onClick={async()=>{

                const token=
                  localStorage.getItem("token");

                await axios.put(

                  `${API_URL}/api/appointment/complete/${appointment._id}`,

                  {},

                  {

                    headers:{

                      Authorization:
                        `Bearer ${token}`

                    }

                  }

                );

                loadAppointment();

              }}

            >

              ✔ Complete Session

            </button>

          }

        </div>

      </div>
            {/* ============================== */}
      {/* APPOINTMENT TIMELINE */}
      {/* ============================== */}

      <div style={card}>

        <h2 style={sectionHeading}>
          Appointment Timeline
        </h2>

        <div
          style={{
            marginTop: "25px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >

          <TimelineItem
            title="Appointment Requested"
            value={appointment.createdAt}
          />

          <TimelineItem
            title="Appointment Approved"
            value={
              appointment.approvedAt || "-"
            }
          />

          <TimelineItem
            title="Payment Submitted"
            value={
              appointment.paymentSubmittedAt ||
              "-"
            }
          />

          <TimelineItem
            title="Payment Verified"
            value={
              appointment.paymentVerifiedAt ||
              "-"
            }
          />

          <TimelineItem
            title="Session Completed"
            value={
              appointment.completedAt || "-"
            }
          />

        </div>

      </div>

    </div>

  );

}

// =====================================
// SMALL COMPONENTS
// =====================================

function SummaryItem({

  title,

  value,

}) {

  return (

    <div>

      <div
        style={{
          fontSize: "13px",
          color: "#888",
          marginBottom: "5px",
        }}
      >

        {title}

      </div>

      <div
        style={{
          fontWeight: "600",
          color: "#333",
        }}
      >

        {value || "-"}

      </div>

    </div>

  );

}

function TimelineItem({

  title,

  value,

}) {

  return (

    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}
    >

      <div
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: "#47685F",
        }}
      />

      <div>

        <strong>

          {title}

        </strong>

        <br/>

        <span
          style={{
            color: "#666",
          }}
        >

          {value || "-"}

        </span>

      </div>

    </div>

  );

}

// =====================================
// STYLES
// =====================================

const card = {

  background: "white",

  borderRadius: "16px",

  padding: "30px",

  marginBottom: "25px",

  boxShadow:
    "0 8px 20px rgba(0,0,0,.08)",

};

const summaryCard = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(180px,1fr))",

  gap: "20px",

  ...card,

};

const grid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",

  gap: "22px",

};

const sectionHeading = {

  color: "#47685F",

  marginTop: 0,

};

const backButton = {

  background: "#47685F",

  color: "white",

  border: "none",

  padding: "12px 22px",

  borderRadius: "10px",

  cursor: "pointer",

};

const linkInput = {

  width: "100%",

  padding: "12px",

  borderRadius: "10px",

  border: "1px solid #DDD",

};

const buttonBase = {

  border: "none",

  color: "white",

  cursor: "pointer",

  padding: "11px 18px",

  borderRadius: "10px",

  fontWeight: "600",

};

const approveButton = {
  ...buttonBase,
  background: "#2E7D32",
};

const rejectButton = {
  ...buttonBase,
  background: "#D32F2F",
};

const verifyButton = {
  ...buttonBase,
  background: "#6A1B9A",
};

const meetButton = {
  ...buttonBase,
  background: "#009688",
};

const notesButton = {
  ...buttonBase,
  background: "#795548",
};

const completeButton = {
  ...buttonBase,
  background: "#455A64",
};

const copyButton = {
  ...buttonBase,
  background: "#1976D2",
};

export default AppointmentDetails;