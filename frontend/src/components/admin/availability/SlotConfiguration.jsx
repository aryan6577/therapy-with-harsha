function SlotConfiguration({
  sessionDuration,
  setSessionDuration,
  slotInterval,
  setSlotInterval,
  bufferTime,
  setBufferTime,
}){
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
        Slot Configuration
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "600",
              color: "#47685F",
            }}
          >
            Session Duration
          </label>

          <select
            value={sessionDuration}
            onChange={(e) =>
              setSessionDuration(Number(e.target.value))
            }
            style={selectStyle}
          >
            <option value={60}>60 Minutes</option>
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "600",
              color: "#47685F",
            }}
          >
            Slot Interval
            <div>
  <label
    style={{
      display: "block",
      marginBottom: "10px",
      fontWeight: "600",
      color: "#47685F",
    }}
  >
    Buffer Time
  </label>

  <select
    value={bufferTime}
    onChange={(e) =>
      setBufferTime(Number(e.target.value))
    }
    style={selectStyle}
  >
    <option value={0}>0 Minutes</option>
    <option value={15}>15 Minutes</option>
    <option value={30}>30 Minutes</option>
  </select>
</div>
          </label>

          <select
            value={slotInterval}
            onChange={(e) =>
              setSlotInterval(Number(e.target.value))
            }
            style={selectStyle}
          >
            <option value={15}>15 Minutes</option>
            <option value={30}>30 Minutes</option>
          </select>
        </div>
      </div>
    </div>
  );
}

const selectStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #DADADA",
  fontSize: "16px",
};

export default SlotConfiguration;