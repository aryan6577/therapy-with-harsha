function WorkingHours({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
}) {
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
        Working Hours
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
        }}
      >
        {/* Start Time */}

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "600",
              color: "#47685F",
            }}
          >
            Start Time
          </label>

          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* End Time */}

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "600",
              color: "#47685F",
            }}
          >
            End Time
          </label>

          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #DADADA",
  fontSize: "16px",
  outline: "none",
};

export default WorkingHours;