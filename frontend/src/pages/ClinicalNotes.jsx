import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";

function ClinicalNotes() {
  const { appointmentId } = useParams();

  const [note, setNote] = useState({
    mood: "",
    sleep: "",
    stressLevel: "Moderate",
    diagnosis: "",
    homework: "",
    therapistNotes: "",
    nextSessionRecommendation: "",
    riskLevel: "Low",
  });

  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    loadAppointment();
    loadClinicalNote();
  }, []);

  const loadAppointment = async () => {
    try {
      const res = await axios.get(
  `/appointment/${appointmentId}`
);

      setAppointment(res.data.appointment);
    } catch (err) {
      console.log(err);
    }
  };

  const loadClinicalNote = async () => {
    try {
      const res = await axios.get(
  `/clinical/${appointmentId}`
);

      if (res.data.note) {
        setNote(res.data.note);
      }
    } catch (err) {}
  };

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const saveNote = async () => {
    try {
      await axios.post(
  "/clinical/save",
  {
    patient: appointment.patient._id,
    appointment: appointment._id,
    ...note,
  }
);

      alert("Clinical Note Saved Successfully");
    } catch (err) {
      alert("Unable to Save");
    }
  };

  if (!appointment) {
    return (
      <div style={{ padding: 50 }}>
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#F5F6FA",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <h1
          style={{
            color: "#47685F",
            marginBottom: "30px",
          }}
        >
          Clinical Notes
        </h1>

        <Info
          title="Appointment ID"
          value={appointment.appointmentId}
        />

        <Info
          title="Patient ID"
          value={appointment.patient.patientId}
        />

        <Info
          title="Patient"
          value={appointment.patient.fullName}
        />

        <Field
          label="Mood"
          name="mood"
          value={note.mood}
          onChange={handleChange}
        />

        <Field
          label="Sleep"
          name="sleep"
          value={note.sleep}
          onChange={handleChange}
        />

        <Select
          label="Stress Level"
          name="stressLevel"
          value={note.stressLevel}
          onChange={handleChange}
          options={[
            "Low",
            "Moderate",
            "High",
          ]}
        />

        <Select
          label="Risk Level"
          name="riskLevel"
          value={note.riskLevel}
          onChange={handleChange}
          options={[
            "Low",
            "Moderate",
            "High",
          ]}
        />

        <TextArea
          label="Diagnosis"
          name="diagnosis"
          value={note.diagnosis}
          onChange={handleChange}
        />

        <TextArea
          label="Homework"
          name="homework"
          value={note.homework}
          onChange={handleChange}
        />

        <TextArea
          label="Therapist Notes"
          name="therapistNotes"
          value={note.therapistNotes}
          onChange={handleChange}
        />

        <TextArea
          label="Next Session Recommendation"
          name="nextSessionRecommendation"
          value={note.nextSessionRecommendation}
          onChange={handleChange}
        />

        <button
          onClick={saveNote}
          style={{
            marginTop: "30px",
            width: "100%",
            padding: "16px",
            background: "#47685F",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          Save Clinical Notes
        </button>
      </div>
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <strong>{title}</strong>
      <div>{value}</div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <>
      <label>{label}</label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyle}
      />
    </>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <>
      <label>{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyle}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <>
      <label>{label}</label>

      <textarea
        rows="4"
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyle}
      />
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #DDD",
  boxSizing: "border-box",
};

export default ClinicalNotes;