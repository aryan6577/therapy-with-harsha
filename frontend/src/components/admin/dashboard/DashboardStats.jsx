function StatCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "25px",
        boxShadow:
          "0 10px 25px rgba(0,0,0,.08)",
        borderTop: `5px solid ${color}`,
      }}
    >
      <div
        style={{
          fontSize: "34px",
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          color: "#666",
          marginBottom: "12px",
          fontWeight: "600",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          margin: 0,
          color: "#222",
          fontSize: "38px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

function DashboardStats({

  totalPatients,

  todaysAppointments,

  pendingAppointments,

  pendingPayments,

  completedSessions,

  revenue,

}) {

  return (

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(230px,1fr))",
        gap: "25px",
        marginBottom: "35px",
      }}
    >

      <StatCard
        icon="👥"
        title="Patients"
        value={totalPatients}
        color="#2563EB"
      />

      <StatCard
        icon="📅"
        title="Today's Sessions"
        value={todaysAppointments}
        color="#10B981"
      />

      <StatCard
        icon="⏳"
        title="Pending Queue"
        value={pendingAppointments}
        color="#F59E0B"
      />

      <StatCard
        icon="💳"
        title="Pending Payments"
        value={pendingPayments}
        color="#9333EA"
      />

      <StatCard
        icon="✅"
        title="Completed"
        value={completedSessions}
        color="#16A34A"
      />

      <StatCard
        icon="💰"
        title="Revenue"
        value={`₹${revenue}`}
        color="#047857"
      />

    </div>

  );

}

export default DashboardStats;