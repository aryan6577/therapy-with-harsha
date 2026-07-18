const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function DaySelector({ selectedDay, setSelectedDay }) {
  return (
    <div
      style={{
        width: "240px",
        background: "white",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          color: "#47685F",
          marginBottom: "25px",
        }}
      >
        Weekly Schedule
      </h3>

      {days.map((day) => (
        <div
          key={day}
          onClick={() => setSelectedDay(day)}
          style={{
            padding: "15px",
            borderRadius: "12px",
            cursor: "pointer",
            marginBottom: "10px",
            transition: "0.3s",

            background:
              selectedDay === day
                ? "#47685F"
                : "#F7F7F7",

            color:
              selectedDay === day
                ? "white"
                : "#47685F",

            fontWeight: "600",
          }}
        >
          {day}
        </div>
      ))}
    </div>
  );
}

export default DaySelector;