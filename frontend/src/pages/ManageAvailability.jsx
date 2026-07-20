import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function ManageAvailability() {
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    loadAvailability();
  }, []);

  const loadAvailability = async () => {
    try {
      const res = await axios.get(
  "/availability"
);

      if (res.data.success) {
        setAvailability(res.data.availability || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateField = (day, field, value) => {
    const existing = availability.find(
      (item) => item.day === day
    );

    if (existing) {
      setAvailability(
        availability.map((item) =>
          item.day === day
            ? {
                ...item,
                [field]: value,
              }
            : item
        )
      );
    } else {
      setAvailability([
        ...availability,
        {
          day,
          startTime: "09:00",
          endTime: "18:00",
          slotDuration: 60,
          isAvailable:
            field === "isAvailable"
              ? value
              : true,
          [field]: value,
        },
      ]);
    }
  };

  const saveDay = async (day) => {
    const item = availability.find(
      (a) => a.day === day
    );

    if (!item) return;

    try {
      const res = await axios.post(
  "/availability/save",
  item
);

      alert(res.data.message);

      loadAvailability();
    } catch (err) {
      console.log(err);
      alert("Unable to save.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F6FA",
        padding: "40px",
      }}
    >
      <h1
        style={{
          color: "#47685F",
          marginBottom: "30px",
        }}
      >
        Manage Weekly Availability
      </h1>

      {days.map((day) => {
        const item =
          availability.find(
            (a) => a.day === day
          ) || {};

        return (
          <div
            key={day}
            style={{
              background: "white",
              marginBottom: "20px",
              borderRadius: "15px",
              padding: "25px",
              boxShadow:
                "0 6px 15px rgba(0,0,0,.08)",
            }}
          >
            <h3
              style={{
                color: "#47685F",
              }}
            >
              {day}
            </h3>

            {/* Availability Switch */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "15px",
                marginBottom: "20px",
              }}
            >
              <label
                style={{
                  fontWeight: "600",
                  color: "#47685F",
                }}
              >
                Available
              </label>

              <input
                type="checkbox"
                checked={
                  item.isAvailable ?? true
                }
                onChange={(e) =>
                  updateField(
                    day,
                    "isAvailable",
                    e.target.checked
                  )
                }
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr 1fr auto",
                gap: "20px",
              }}
            >
              <div>
                <label>Start Time</label>

                <input
                  type="time"
                  value={
                    item.startTime ||
                    "09:00"
                  }
                  disabled={
                    item.isAvailable === false
                  }
                  onChange={(e) =>
                    updateField(
                      day,
                      "startTime",
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />
              </div>

              <div>
                <label>End Time</label>

                <input
                  type="time"
                  value={
                    item.endTime ||
                    "18:00"
                  }
                  disabled={
                    item.isAvailable === false
                  }
                  onChange={(e) =>
                    updateField(
                      day,
                      "endTime",
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />
              </div>

              <div>
                <label>Slot Duration</label>

                <select
                  value={
                    item.slotDuration ||
                    60
                  }
                  disabled={
                    item.isAvailable === false
                  }
                  onChange={(e) =>
                    updateField(
                      day,
                      "slotDuration",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  style={inputStyle}
                >
                  <option value={15}>
                    15 Minutes
                  </option>

                  <option value={30}>
                    30 Minutes
                  </option>

                  <option value={45}>
                    45 Minutes
                  </option>

                  <option value={60}>
                    60 Minutes
                  </option>

                  <option value={90}>
                    90 Minutes
                  </option>
                </select>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                }}
              >
                <button
                  onClick={() =>
                    saveDay(day)
                  }
                  style={buttonStyle}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  borderRadius: "10px",
  border: "1px solid #DDD",
  boxSizing: "border-box",
};

const buttonStyle = {
  background: "#47685F",
  color: "white",
  border: "none",
  padding: "13px 24px",
  borderRadius: "10px",
  cursor: "pointer",
};

export default ManageAvailability;