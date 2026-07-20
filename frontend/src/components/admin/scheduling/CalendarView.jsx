import { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";

function CalendarView() {

  // =====================================
  // STATES
  // =====================================

  const today = new Date();

  const [currentDate, setCurrentDate] =
    useState(new Date());

  const [days, setDays] =
    useState([]);
  const [selectedDay, setSelectedDay] = useState(null);  
  const [holidays, setHolidays] =
    useState([]);

  const [vacations, setVacations] =
    useState([]);

  const [blockedSlots, setBlockedSlots] =
    useState([]);

  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
    

  // =====================================
  // EFFECTS
  // =====================================

  useEffect(() => {

    generateCalendar();

  }, [currentDate]);

  useEffect(() => {

    loadCalendarData();

  }, []);

  // =====================================
  // GENERATE MONTH
  // =====================================

  const generateCalendar = () => {

    const year =
      currentDate.getFullYear();

    const month =
      currentDate.getMonth();

    const firstDay =
      new Date(year, month, 1);

    const lastDay =
      new Date(year, month + 1, 0);

    const startDay =
      firstDay.getDay();

    const totalDays =
      lastDay.getDate();

    const calendar = [];

    for (let i = 0; i < startDay; i++) {

      calendar.push(null);

    }

    for (let i = 1; i <= totalDays; i++) {

      calendar.push(
        new Date(year, month, i)
      );

    }

    setDays(calendar);

  };

  // =====================================
  // LOAD DATABASE
  // =====================================

  const loadCalendarData =
    async () => {

      try {

        setLoading(true);

        const token =
          localStorage.getItem("token");

const [
  holidayRes,
  vacationRes,
  blockedRes,
  appointmentRes,
] = await Promise.all([
  axios.get("/holiday"),

  axios.get("/vacation"),

  axios.get("/blocked-slot"),

  axios.get("/appointment", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
]);

        if (
          holidayRes.data.success
        ) {

          setHolidays(
            holidayRes.data.holidays
          );

        }

        if (
          vacationRes.data.success
        ) {

          setVacations(
            vacationRes.data.vacations
          );

        }

        if (
          blockedRes.data.success
        ) {

          setBlockedSlots(
            blockedRes.data.blockedSlots
          );

        }

        if (
          appointmentRes.data.success
        ) {

          setAppointments(
            appointmentRes.data.appointments
          );

        }

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

  // =====================================
  // HELPERS
  // =====================================

  const formatDate = (date) =>

    new Date(date)
      .toISOString()
      .split("T")[0];

  const isHoliday = (day) => {

    if (!day) return false;

    return holidays.some(

      (holiday) =>

        formatDate(
          holiday.date
        ) === formatDate(day)

    );

  };

  const isVacation = (day) => {

    if (!day) return false;

    return vacations.some(

      (vacation) => {

        const current =
          new Date(
            formatDate(day)
          );

        const start =
          new Date(
            formatDate(
              vacation.startDate
            )
          );

        const end =
          new Date(
            formatDate(
              vacation.endDate
            )
          );

        return (
          current >= start &&
          current <= end
        );

      }

    );

  };

  const blockedCount =
    (day) => {

      if (!day) return 0;

      return blockedSlots.filter(

        (slot) =>

          formatDate(
            slot.date
          ) === formatDate(day)

      ).length;

    };

  const appointmentCount =
    (day) => {

      if (!day) return 0;

      return appointments.filter(

        (appointment) =>

          appointment.date &&

          formatDate(
            appointment.date
          ) === formatDate(day)

      ).length;

    };

  const monthName =
    currentDate.toLocaleString(
      "default",
      {
        month: "long",
      }
    );

  const year =
    currentDate.getFullYear();

  const previousMonth = () => {

    setCurrentDate(

      new Date(

        year,

        currentDate.getMonth() - 1,

        1

      )

    );

  };

  const nextMonth = () => {

    setCurrentDate(

      new Date(

        year,

        currentDate.getMonth() + 1,

        1

      )

    );

  };
  const openDay = (day) => {
  if (!day) return;

  setSelectedDay({
    date: day,
    holidays: holidays.filter(
      (h) =>
        new Date(h.date).toDateString() ===
        day.toDateString()
    ),
    vacations: vacations.filter((v) => {
      const start = new Date(v.startDate);
      const end = new Date(v.endDate);

      return day >= start && day <= end;
    }),
    blockedSlots: blockedSlots.filter(
      (b) =>
        new Date(b.date).toDateString() ===
        day.toDateString()
    ),
  });
};
  return (

  <div
    style={{
      maxWidth: "1220px",
      margin: "0 auto",
      padding: "6px",
    }}
  >

    {/* Header */}

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "18px",
      }}
    >

      <button
        style={navButton}
        onClick={previousMonth}
      >
        ◀ Previous
      </button>

      <h1
        style={{
          color: "#47685F",
          fontSize: "32px",
          fontWeight: "700",
          margin: 0,
        }}
      >
        {monthName} {year}
      </h1>

      <button
        style={navButton}
        onClick={nextMonth}
      >
        Next ▶
      </button>

    </div>

    {

      loading ?

      (

        <div
          style={{
            padding: "80px",
            textAlign: "center",
            color: "#47685F",
            fontSize: "22px",
          }}
        >

          Loading Calendar...

        </div>

      )

      :

      (

        <>

          {/* Week Days */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(7,1fr)",
              gap: "6px",
              marginBottom: "8px",
            }}
          >

            {

              [

                "Sun",

                "Mon",

                "Tue",

                "Wed",

                "Thu",

                "Fri",

                "Sat",

              ].map((weekday)=>(

                <div

                  key={weekday}

                  style={{

                    textAlign:"center",

                    color:"#47685F",

                    fontWeight:"700",

                    fontSize:"14px",

                  }}

                >

                  {weekday}

                </div>

              ))

            }

          </div>

          {/* Calendar */}

          <div
            style={{
              display:"grid",
              gridTemplateColumns:
                "repeat(7,1fr)",
              gap:"6px",
            }}
          >

            {

              days.map((day,index)=>{

                if(!day){

                  return (

                    <div
                      key={index}
                    />

                  );

                }

                const todayBox =

                  day.toDateString()===

                  today.toDateString();

                return(

                  <div

                    key={index}
                    onClick={() => openDay(day)}

                    style={{

                      height:"82px",

                      background:

                        todayBox

                        ? "#47685F"

                        : "white",

                      color:

                        todayBox

                        ? "white"

                        : "#222",

                      borderRadius:"10px",

                      padding:"6px",

                      display:"flex",

                      flexDirection:"column",

                      justifyContent:"space-between",

                      boxShadow:

                        "0 2px 8px rgba(0,0,0,.08)",

                      transition:".2s",

                      cursor:"pointer",
                      

                    }}

                  >

                    <div

                      style={{

                        fontWeight:"700",

                        fontSize:"15px",

                      }}

                    >

                      {day.getDate()}

                    </div>

                    <div

                      style={{

                        display:"flex",

                        flexDirection:"column",

                        gap:"2px",

                      }}

                    >

                      {

                        isHoliday(day)

                        &&

                        <span style={holidayBadge}>

                          Holiday

                        </span>

                      }

                      {

                        isVacation(day)

                        &&

                        <span style={vacationBadge}>

                          Vacation

                        </span>

                      }

                      {

                        blockedCount(day)>0

                        &&

                        <span style={blockedBadge}>

                          {blockedCount(day)}

                          {" "}
                          Blocked

                        </span>

                      }

                      {

                        appointmentCount(day)>0

                        &&

                        <span style={appointmentBadge}>

                          {appointmentCount(day)}

                          {" "}
                          Appointment

                        </span>

                      }

                    </div>

                  </div>

                );

              })

            }

          </div>

        </>

      )

    }
    {selectedDay && (
  <div
    style={{
      marginTop: "25px",
      background: "white",
      borderRadius: "14px",
      padding: "20px",
      boxShadow: "0 3px 10px rgba(0,0,0,.1)",
    }}
  >
    <h3 style={{ color: "#47685F" }}>
      {selectedDay.date.toDateString()}
    </h3>

    <hr />

    <h4>Holidays</h4>

    {selectedDay.holidays.length === 0 ? (
      <p>None</p>
    ) : (
      selectedDay.holidays.map((h) => (
        <p key={h._id}>🎉 {h.reason}</p>
      ))
    )}

    <h4>Vacations</h4>

    {selectedDay.vacations.length === 0 ? (
      <p>None</p>
    ) : (
      selectedDay.vacations.map((v) => (
        <p key={v._id}>
          🌴 {v.reason}
        </p>
      ))
    )}

    <h4>Blocked Slots</h4>

    {selectedDay.blockedSlots.length === 0 ? (
      <p>None</p>
    ) : (
      selectedDay.blockedSlots.map((b) => (
        <p key={b._id}>
          ⛔ {b.startTime} - {b.endTime}
        </p>
      ))
    )}
  </div>
)}

  </div>

);}
const getBlockedSlots = (day) => {

  if (!day) return [];

  return blockedSlots.filter(

    slot =>

      formatDate(slot.date) ===

      formatDate(day)

  );

};

const getAppointments = (day) => {

  if (!day) return [];

  return appointments.filter(

    appointment =>

      appointment.date &&

      formatDate(appointment.date) ===

      formatDate(day)

  );

};

const openDay = (day) => {

  setSelectedDay(day);

  setShowPanel(true);

};
const navButton = {

  background: "#47685F",

  color: "white",

  border: "none",

  borderRadius: "10px",

  padding: "8px 18px",

  cursor: "pointer",

  fontWeight: "600",

  fontSize: "14px",

  boxShadow:
    "0 3px 8px rgba(0,0,0,.15)",

  transition: ".2s",

};

const holidayBadge = {

  background: "#E74C3C",

  color: "white",

  fontSize: "9px",

  padding: "2px 6px",

  borderRadius: "5px",

  textAlign: "center",

};

const vacationBadge = {

  background: "#F39C12",

  color: "white",

  fontSize: "9px",

  padding: "2px 6px",

  borderRadius: "5px",

  textAlign: "center",

};

const blockedBadge = {

  background: "#8E44AD",

  color: "white",

  fontSize: "9px",

  padding: "2px 6px",

  borderRadius: "5px",

  textAlign: "center",

};

const appointmentBadge = {

  background: "#3498DB",

  color: "white",

  fontSize: "9px",

  padding: "2px 6px",

  borderRadius: "5px",

  textAlign: "center",

};

export default CalendarView;