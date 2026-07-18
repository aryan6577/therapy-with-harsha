import { useState } from "react";

const allDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function CopySchedule({
  selectedDay,
  weeklySchedule,
  setWeeklySchedule,
}) {
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const applySchedule = () => {
    const updated = { ...weeklySchedule };

    selectedDays.forEach((day) => {
      updated[day] = JSON.parse(
        JSON.stringify(weeklySchedule[selectedDay])
      );
    });

    setWeeklySchedule(updated);

    alert("Schedule copied successfully!");

    setSelectedDays([]);
  };

  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "20px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
        marginBottom: "25px",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          color: "#47685F",
        }}
      >
        Copy Schedule
      </h2>

      <p
        style={{
          color: "#666",
          marginBottom: "20px",
        }}
      >
        Copy <b>{selectedDay}</b>'s schedule to:
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "12px",
        }}
      >
        {allDays
          .filter((day) => day !== selectedDay)
          .map((day) => (
            <label
              key={day}
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => toggleDay(day)}
              />

              {day}
            </label>
          ))}
      </div>

      <button
        onClick={applySchedule}
        style={{
          marginTop: "20px",
          background: "#47685F",
          color: "white",
          border: "none",
          padding: "14px 28px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        📋 Apply Schedule
      </button>
    </div>
  );
}

export default CopySchedule;