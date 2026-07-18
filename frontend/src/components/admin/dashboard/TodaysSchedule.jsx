function ScheduleRow({ appointment }) {

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 0",
        borderBottom: "1px solid #EFEFEF",
      }}
    >

      <div>

        <h4
          style={{
            margin: 0,
            color: "#47685F",
          }}
        >
          {appointment.patient?.fullName}
        </h4>

        <p
          style={{
            marginTop: "6px",
            color: "#777",
            fontSize: "14px",
          }}
        >
          {appointment.patient?.patientId}
        </p>

      </div>

      <div
        style={{
          textAlign: "right",
        }}
      >

        <h4
          style={{
            margin: 0,
            color: "#333",
          }}
        >
          {appointment.appointmentTime}
        </h4>

        <p
          style={{
            marginTop: "6px",
            color: "#777",
          }}
        >
          {appointment.status}
        </p>

      </div>

    </div>

  );

}

function TodaysSchedule({ appointments }) {

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const todaysAppointments =
    appointments
      .filter(
        appointment =>
          appointment.appointmentDate ===
          today
      )
      .sort(
        (a,b)=>

          a.appointmentTime.localeCompare(
            b.appointmentTime
          )
      );

  return (

    <div
      style={{
        background:"white",
        borderRadius:"20px",
        padding:"30px",
        boxShadow:
          "0 10px 25px rgba(0,0,0,.08)",
      }}
    >

      <h2
        style={{
          color:"#47685F",
          marginBottom:"25px",
        }}
      >
        📅 Today's Schedule
      </h2>

      {

        todaysAppointments.length===0 ?

        (

          <div
            style={{
              padding:"40px",
              textAlign:"center",
              color:"#888",
            }}
          >

            No appointments today

          </div>

        )

        :

        todaysAppointments.map(

          appointment=>

          (

            <ScheduleRow

              key={appointment._id}

              appointment={appointment}

            />

          )

        )

      }

    </div>

  );

}

export default TodaysSchedule;