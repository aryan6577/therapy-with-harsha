import { useState, useEffect } from "react";

function RescheduleModal({
  open,
  onCancel,
  onConfirm,
}) {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {

    if (open) {

      setDate("");
      setTime("");

    }

  }, [open]);

  if (!open) return null;

  return (

    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >

      <div
        style={{
          width: "500px",
          background: "white",
          borderRadius: "18px",
          padding: "30px",
          boxShadow:
            "0 15px 40px rgba(0,0,0,.25)",
        }}
      >

        <h2
          style={{
            marginTop: 0,
            color: "#47685F",
          }}
        >
          Reschedule Appointment
        </h2>

        <p
          style={{
            color: "#666",
          }}
        >
          Select a new date and time.
        </p>

        <div
          style={{
            marginTop: "20px",
          }}
        >

          <label>
            New Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e)=>
              setDate(e.target.value)
            }
            style={input}
          />

        </div>

        <div
          style={{
            marginTop:"20px",
          }}
        >

          <label>
            New Time
          </label>

          <input
            type="time"
            value={time}
            onChange={(e)=>
              setTime(e.target.value)
            }
            style={input}
          />

        </div>

        <div
          style={{
            display:"flex",
            justifyContent:"flex-end",
            gap:"12px",
            marginTop:"30px",
          }}
        >

          <button
            onClick={onCancel}
            style={cancelButton}
          >
            Cancel
          </button>

          <button
            onClick={()=>
              onConfirm(date,time)
            }
            style={confirmButton}
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>

  );

}

const input = {

  width:"100%",

  padding:"14px",

  marginTop:"8px",

  border:"1px solid #DDD",

  borderRadius:"10px",

  fontSize:"15px",

};

const cancelButton = {

  background:"#EEE",

  border:"none",

  padding:"12px 20px",

  borderRadius:"10px",

  cursor:"pointer",

};

const confirmButton = {

  background:"#47685F",

  color:"white",

  border:"none",

  padding:"12px 22px",

  borderRadius:"10px",

  cursor:"pointer",

};

export default RescheduleModal;