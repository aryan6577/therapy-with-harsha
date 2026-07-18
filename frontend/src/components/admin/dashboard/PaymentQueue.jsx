function PaymentCard({
  appointment,
  onVerify,
}) {

  return (

    <div
      style={{
        background: "#FAFAFA",
        border: "1px solid #E5E7EB",
        borderRadius: "15px",
        padding: "20px",
        marginBottom: "18px",
      }}
    >

      <h3
        style={{
          margin: 0,
          color: "#47685F",
        }}
      >
        {appointment.patient?.fullName}
      </h3>

      <p
        style={{
          marginTop: "8px",
          color: "#666",
        }}
      >
        {appointment.patient?.patientId}
      </p>

      <p>
        💳 Transaction :
        {" "}
        {appointment.transactionId || "-"}
      </p>

      <p>
        📅
        {" "}
        {appointment.appointmentDate}
        {" "}
        {appointment.appointmentTime}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "15px",
        }}
      >

        <button
          style={greenButton}
          onClick={() =>
            onVerify(appointment)
          }
        >
          Verify Payment
        </button>

        {appointment.paymentScreenshot && (

          <a
  href={appointment.paymentScreenshot}
  target="_blank"
  rel="noreferrer"
  style={linkButton}
>
  View Screenshot
</a>

        )}

      </div>

    </div>

  );

}

function PaymentQueue({
  appointments,
  onVerify,
}) {

  const pendingPayments =
    appointments.filter(

      appointment =>

        appointment.paymentStatus ===
        "Submitted"

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

      <h2
        style={{
          color: "#47685F",
          marginBottom: "25px",
        }}
      >
        💳 Payment Verification Queue
      </h2>

      {

        pendingPayments.length === 0 ?

        (

          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "#888",
            }}
          >
            No Pending Payments
          </div>

        )

        :

        pendingPayments.map(

          appointment => (

            <PaymentCard

              key={appointment._id}

              appointment={appointment}

              onVerify={onVerify}

            />

          )

        )

      }

    </div>

  );

}

const greenButton = {
  background: "#16A34A",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};

const linkButton = {
  background: "#47685F",
  color: "white",
  padding: "10px 18px",
  borderRadius: "10px",
  textDecoration: "none",
};

export default PaymentQueue;