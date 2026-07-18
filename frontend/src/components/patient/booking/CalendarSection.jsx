import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarSection({
  selectedDate,
  setSelectedDate,
}) {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          color: "#47685F",
          marginBottom: "20px",
        }}
      >
        Select Date
      </h2>

      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        minDate={new Date()}
      />
    </div>
  );
}

export default CalendarSection;