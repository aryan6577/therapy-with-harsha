import QueueCard from "./QueueCard";

function PendingQueue({
  appointments,
  onApprove,
  onReject,
  onReschedule,
}) {

  const pendingAppointments =
    appointments
      .filter(
        (appointment) =>
          appointment.status === "Pending"
      )
      .sort(
        (a, b) =>
          new Date(a.createdAt) -
          new Date(b.createdAt)
      );

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "30px",
        boxShadow:
          "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2
          style={{
            color: "#47685F",
            margin: 0,
          }}
        >
          🔥 Pending Appointment Queue
        </h2>

        <div
          style={{
            background: "#FEF3C7",
            color: "#92400E",
            padding: "8px 16px",
            borderRadius: "30px",
            fontWeight: "600",
          }}
        >
          {pendingAppointments.length} Pending
        </div>
      </div>

      {pendingAppointments.length === 0 ? (
        <div
          style={{
            padding: "60px",
            textAlign: "center",
            color: "#888",
          }}
        >
          <h3>No Pending Appointments 🎉</h3>

          <p>
            All appointment requests have
            been handled.
          </p>
        </div>
      ) : (
        pendingAppointments.map(
          (appointment) => (
            <QueueCard
              key={appointment._id}
              appointment={appointment}
              onApprove={onApprove}
              onReject={onReject}
              onReschedule={
                onReschedule
              }
            />
          )
        )
      )}
    </div>
  );
}

export default PendingQueue;