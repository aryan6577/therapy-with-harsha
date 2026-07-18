import { useState, useEffect } from "react";

function RejectModal({
  open,
  onCancel,
  onConfirm,
}) {

  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) {
      setReason("");
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
          Reject Appointment
        </h2>

        <p
          style={{
            color: "#666",
          }}
        >
          Please enter the reason for rejection.
        </p>

        <textarea
          value={reason}
          onChange={(e) =>
            setReason(e.target.value)
          }
          rows={6}
          placeholder="Reason..."
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #DDD",
            resize: "none",
            fontSize: "15px",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "25px",
          }}
        >
          <button
            onClick={onCancel}
            style={{
              background: "#EEE",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onConfirm(reason)
            }
            style={{
              background: "#DC2626",
              color: "white",
              border: "none",
              padding: "12px 22px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Reject Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default RejectModal;