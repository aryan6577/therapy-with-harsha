function BookingSummary({
  selectedDate,
  selectedSlot,
  bookAppointment,
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
        Booking Summary
      </h2>

      <p>
        <strong>Date :</strong>{" "}
        {selectedDate
          ? selectedDate.toDateString()
          : "-"}
      </p>

      <p>
        <strong>Time :</strong>{" "}
        {selectedSlot
          ? selectedSlot.time12
          : "-"}
      </p>

      <p>
        <strong>Session :</strong> Online
      </p>

      <button
        onClick={bookAppointment}
        disabled={!selectedSlot}
        style={{
          marginTop: "25px",
          width: "100%",
          padding: "15px",
          border: "none",
          borderRadius: "10px",
          background: "#47685F",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        Confirm Booking
      </button>
    </div>
  );
}

export default BookingSummary;