function AvailableSlots({
  slots,
  selectedSlot,
  setSelectedSlot,
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
        Available Time Slots
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(120px,1fr))",
          gap: "12px",
        }}
      >
        {slots.map((slot) => (
          <button
            key={slot.time24}
            onClick={() => setSelectedSlot(slot)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border:
                selectedSlot?.time24 === slot.time24
                  ? "2px solid #47685F"
                  : "1px solid #ddd",
              background:
                selectedSlot?.time24 === slot.time24
                  ? "#47685F"
                  : "white",
              color:
                selectedSlot?.time24 === slot.time24
                  ? "white"
                  : "#333",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {slot.time12}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AvailableSlots;