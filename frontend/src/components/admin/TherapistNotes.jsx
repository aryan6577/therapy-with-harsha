import { useEffect, useState } from "react";
import axios from "axios";

function TherapistNotes({ patientId }) {
  const [notes, setNotes] = useState([]);

  const [form, setForm] = useState({
    sessionNumber: "",
    moodScore: "",
    observations: "",
    treatmentPlan: "",
    homework: "",
    nextSessionDate: "",
    privateNotes: "",
  });

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/notes/${patientId}`
    );

    setNotes(res.data);
  };

  const saveNote = async () => {
    await axios.post(
      "http://localhost:5000/api/notes",
      {
        patient: patientId,
        ...form,
      }
    );

    alert("Note Saved");

    loadNotes();
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Therapist Notes</h2>

      <input
        placeholder="Session Number"
        onChange={(e) =>
          setForm({
            ...form,
            sessionNumber: e.target.value,
          })
        }
      />

      <br /><br />

      <input
        placeholder="Mood Score (1-10)"
        onChange={(e) =>
          setForm({
            ...form,
            moodScore: e.target.value,
          })
        }
      />

      <br /><br />

      <textarea
        placeholder="Observations"
        rows={4}
        onChange={(e) =>
          setForm({
            ...form,
            observations: e.target.value,
          })
        }
      />

      <br /><br />

      <textarea
        placeholder="Treatment Plan"
        rows={4}
        onChange={(e) =>
          setForm({
            ...form,
            treatmentPlan: e.target.value,
          })
        }
      />

      <br /><br />

      <textarea
        placeholder="Homework"
        rows={3}
        onChange={(e) =>
          setForm({
            ...form,
            homework: e.target.value,
          })
        }
      />

      <br /><br />

      <input
        type="date"
        onChange={(e) =>
          setForm({
            ...form,
            nextSessionDate: e.target.value,
          })
        }
      />

      <br /><br />

      <textarea
        placeholder="Private Notes"
        rows={5}
        onChange={(e) =>
          setForm({
            ...form,
            privateNotes: e.target.value,
          })
        }
      />

      <br /><br />

      <button onClick={saveNote}>
        Save Note
      </button>

      <hr />

      <h2>Previous Notes</h2>

      {notes.map((note) => (
        <div
          key={note._id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Session {note.sessionNumber}</h3>

          <p>
            <b>Mood:</b> {note.moodScore}/10
          </p>

          <p>
            <b>Observations:</b> {note.observations}
          </p>

          <p>
            <b>Treatment:</b> {note.treatmentPlan}
          </p>

          <p>
            <b>Homework:</b> {note.homework}
          </p>

          <p>
            <b>Next Session:</b> {note.nextSessionDate}
          </p>

          <p>
            <b>Private:</b> {note.privateNotes}
          </p>
        </div>
      ))}
    </div>
  );
}

export default TherapistNotes;