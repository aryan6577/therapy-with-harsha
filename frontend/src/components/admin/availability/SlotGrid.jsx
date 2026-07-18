function SlotGrid({ slots, setSlots }) {
  const toggleSlot = (index) => {
    const updatedSlots = [...slots];

    updatedSlots[index].enabled = !updatedSlots[index].enabled;

    setSlots(updatedSlots);
  };

  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
        marginBottom: "25px",
      }}
    >
      <h2
        style={{
          color: "#47685F",
          marginTop: 0,
          marginBottom: "25px",
        }}
      >
        Generated Slots
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))",
          gap: "15px",
        }}
      >
        {slots.map((slot, index) => (
          <label
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px",
              border: "1px solid #E5E5E5",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor: slot.enabled
                ? "#F8FCFB"
                : "#FFF3F3",
            }}
          >
            <input
              type="checkbox"
              checked={slot.enabled}
              onChange={() => toggleSlot(index)}
            />

            <span
              style={{
                color: "#47685F",
                fontWeight: "500",
              }}
            >
              {slot.time12}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default SlotGrid;