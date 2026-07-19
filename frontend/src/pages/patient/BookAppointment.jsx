import { useEffect, useState } from "react";
import axios from "axios";

function BookAppointment() {

  // ==========================
  // FORM STATES
  // ==========================

  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedTime, setSelectedTime] =
    useState("");

  const [appointmentType, setAppointmentType] =
    useState("Initial Consultation");

  const [sessionType, setSessionType] =
    useState("Online");

  const [concern, setConcern] =
    useState("");

  // ==========================
  // DATA STATES
  // ==========================

  const [availableSlots, setAvailableSlots] =
    useState([]);

  const [weeklyAvailability, setWeeklyAvailability] =
    useState([]);

  const [holidays, setHolidays] =
    useState([]);

  const [vacations, setVacations] =
    useState([]);

  const [blockedSlots, setBlockedSlots] =
    useState([]);

  const [clinicSettings, setClinicSettings] =
    useState(null);

  const [loadingSlots, setLoadingSlots] =
    useState(false);

  const [bookingLoading, setBookingLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // ==========================
  // INITIAL LOAD
  // ==========================

  useEffect(() => {

    loadClinicSettings();

    loadWeeklyAvailability();

    loadHolidays();

    loadVacations();

    loadBlockedSlots();

  }, []);

  // ==========================
  // LOAD CLINIC SETTINGS
  // ==========================

  const loadClinicSettings = async () => {

    try {

      const res =
        await axios.get(
          "${API_URL}/api/settings"
        );

      if (res.data.success) {

        setClinicSettings(
          res.data.settings
        );

      }

    } catch (err) {

      console.log(err);

    }

  };

  // ==========================
  // LOAD WEEKLY AVAILABILITY
  // ==========================

  const loadWeeklyAvailability =
    async () => {

      try {

        const res =
          await axios.get(
            "${API_URL}/api/availability"
          );

        if (res.data.success) {

          setWeeklyAvailability(
            res.data.data
          );

        }

      } catch (err) {

        console.log(err);

      }

    };

  // ==========================
  // LOAD HOLIDAYS
  // ==========================

  const loadHolidays =
    async () => {

      try {

        const res =
          await axios.get(
            "${API_URL}/api/holiday"
          );

        if (res.data.success) {

          setHolidays(
            res.data.holidays
          );

        }

      } catch (err) {

        console.log(err);

      }

    };

  // ==========================
  // LOAD VACATIONS
  // ==========================

  const loadVacations =
    async () => {

      try {

        const res =
          await axios.get(
            "${API_URL}/api/vacation"
          );

        if (res.data.success) {

          setVacations(
            res.data.vacations
          );

        }

      } catch (err) {

        console.log(err);

      }

    };

  // ==========================
  // LOAD BLOCKED SLOTS
  // ==========================

  const loadBlockedSlots =
    async () => {

      try {

        const res =
          await axios.get(
            "${API_URL}/api/blocked-slot"
          );

        if (res.data.success) {

          setBlockedSlots(
            res.data.blockedSlots
          );

        }

      } catch (err) {

        console.log(err);

      }

    };

  // ==========================
  // DATE CHANGED
  // ==========================

  useEffect(() => {

    if (!selectedDate) return;

    loadAvailableSlots(
      selectedDate
    );

  }, [selectedDate]);

  // ==========================
  // TIME HELPERS
  // ==========================

  const timeToMinutes = (time) => {

    const [hour, minute] =
      time.split(":").map(Number);

    return hour * 60 + minute;

  };

  const formatTime = (time) => {

    const [hour, minute] =
      time.split(":").map(Number);

    const suffix =
      hour >= 12
        ? "PM"
        : "AM";

    const h =
      hour % 12 || 12;

    return `${h}:${String(
      minute
    ).padStart(
      2,
      "0"
    )} ${suffix}`;

  };

  // ==========================
  // GENERATE TIME SLOTS
  // ==========================

  const generateSlots = (
    start,
    end,
    duration
  ) => {

    const slots = [];

    const [sh, sm] =
      start.split(":").map(Number);

    const [eh, em] =
      end.split(":").map(Number);

    let current =
      sh * 60 + sm;

    const finish =
      eh * 60 + em;

    while (
      current + duration <=
      finish
    ) {

      const hour =
        Math.floor(
          current / 60
        );

      const minute =
        current % 60;

      slots.push(
        `${String(hour).padStart(
          2,
          "0"
        )}:${String(
          minute
        ).padStart(
          2,
          "0"
        )}`
      );

      current += duration;

    }

    return slots;

  };
    // ==========================
  // LOAD AVAILABLE SLOTS
  // ==========================

  const loadAvailableSlots = async (date) => {

    try {

      setLoadingSlots(true);

      setMessage("");

      setAvailableSlots([]);

      // ==========================
      // Find Week Day
      // ==========================

      const weekDay =
        new Date(date).toLocaleDateString(
          "en-US",
          {
            weekday: "long",
          }
        );

      // ==========================
      // Holiday Check
      // ==========================

      const holiday =
        holidays.find(
          (item) =>
            item.date.substring(0, 10) ===
            date
        );

      if (holiday) {

        setMessage(
          `🎉 Clinic Closed (${holiday.reason})`
        );

        return;

      }

      // ==========================
      // Vacation Check
      // ==========================

      const onVacation =
        vacations.find((vacation) => {

          const start =
            vacation.startDate.substring(
              0,
              10
            );

          const end =
            vacation.endDate.substring(
              0,
              10
            );

          return (
            date >= start &&
            date <= end
          );

        });

      if (onVacation) {

        setMessage(
          "🌴 Harsha is on vacation."
        );

        return;

      }

      // ==========================
      // Weekly Availability
      // ==========================

      const schedule =
        weeklyAvailability.find(
          (item) =>
            item.day === weekDay
        );

      if (!schedule) {

        setMessage(
          "No schedule available."
        );

        return;

      }

      if (!schedule.isAvailable) {

        setMessage(
          "🚫 Clinic Closed Today"
        );

        return;

      }

      // ==========================
      // Generate Slots
      // ==========================

      let slots =
        generateSlots(

          schedule.startTime,

          schedule.endTime,

          schedule.slotDuration

        );

      // ==========================
      // Remove Blocked Slots
      // ==========================

      const blockedToday =
        blockedSlots.filter(
          (slot) =>
            slot.date === date
        );

      slots = slots.filter(
        (slot) => {

          const slotMinutes =
            timeToMinutes(slot);

          const blocked =
            blockedToday.some(
              (item) => {

                const start =
                  timeToMinutes(
                    item.startTime
                  );

                const end =
                  timeToMinutes(
                    item.endTime
                  );

                return (

                  slotMinutes >= start &&

                  slotMinutes < end

                );

              }
            );

          return !blocked;

        }
      );

      // ==========================
      // Remove Booked Slots
      // ==========================

      const bookedRes =
        await axios.get(

          `${API_URL}/api/appointment/booked-slots/${date}`

        );

      if (bookedRes.data.success) {

        const booked =
          bookedRes.data.bookedSlots;

        slots =
          slots.filter(
            (slot) =>
              !booked.includes(slot)
          );

      }

      // ==========================
      // Final Result
      // ==========================

      setAvailableSlots(slots);

      if (slots.length === 0) {

        setMessage(
          "No slots available."
        );

      }

    }

    catch (err) {

      console.log(err);

      setMessage(
        "Unable to load slots."
      );

    }

    finally {

      setLoadingSlots(false);

    }

  };

  // ==========================
  // DATE CHANGED
  // ==========================

  const handleDateChange = (e) => {

    setSelectedDate(
      e.target.value
    );

    setSelectedTime("");

  };
    // ==========================
  // BOOK APPOINTMENT
  // ==========================

  const bookAppointment = async () => {

    try {

      if (!selectedDate) {

        alert("Please select a date.");

        return;

      }

      if (!selectedTime) {

        alert("Please select a time.");

        return;

      }

      const token =
        localStorage.getItem("token");

      if (!token) {

        alert("Please login first.");

        return;

      }

      setBookingLoading(true);

      // ==========================
      // Get Logged In User
      // ==========================

      const userRes =
        await axios.get(

          "${API_URL}/api/auth/me",

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

      if (!userRes.data.success) {

        alert("Unable to fetch user.");

        return;

      }

      const patient =
        userRes.data.user._id;

      // ==========================
      // Get Patient Profile
      // ==========================

      let patientProfile = null;

      try {

        const profileRes =
          await axios.get(

            "${API_URL}/api/patient/profile",

            {

              headers: {

                Authorization:
                  `Bearer ${token}`,

              },

            }

          );

        if (
          profileRes.data.success
        ) {

          patientProfile =
            profileRes.data.profile._id;

        }

      }

      catch {

        patientProfile = null;

      }

      // ==========================
      // Book Appointment
      // ==========================

      const response =
        await axios.post(

          "${API_URL}/api/appointment/book",

          {

            patient,

            patientProfile,

            appointmentDate:
              selectedDate,

            appointmentTime:
              selectedTime,

            appointmentType,

            sessionType,

            concern,

          },

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

      if (response.data.success) {

        alert(

          "✅ Appointment Request Submitted Successfully.\n\nHarsha will review your request."

        );

        setSelectedDate("");

        setSelectedTime("");

        setConcern("");

        setAppointmentType(
          "Initial Consultation"
        );

        setSessionType(
          "Online"
        );

        setAvailableSlots([]);

        setMessage("");

      }

    }

    catch (err) {

      console.log(err);

      alert(

        err.response?.data?.message ||

        "Unable to book appointment."

      );

    }

    finally {

      setBookingLoading(false);

    }

  };

  // ==========================
  // INPUT STYLE
  // ==========================

  const inputStyle = {

    width: "100%",

    padding: "14px",

    borderRadius: "10px",

    border: "1px solid #DDD",

    marginTop: "8px",

    marginBottom: "20px",

    fontSize: "16px",

    boxSizing: "border-box",

  };

  const textAreaStyle = {

    ...inputStyle,

    resize: "vertical",

    minHeight: "120px",

  };

  const buttonStyle = {

    width: "100%",

    padding: "16px",

    background: "#47685F",

    color: "white",

    border: "none",

    borderRadius: "12px",

    fontSize: "18px",

    cursor: "pointer",

    fontWeight: "600",

  };

  const infoRow = {

    display: "flex",

    justifyContent: "space-between",

    marginBottom: "12px",

    fontSize: "16px",

  };
    // ==========================
  // JSX
  // ==========================

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#F6F4EF",
        padding: "50px 20px",
      }}
    >

      <div
        style={{
          maxWidth: "850px",
          margin: "auto",
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,.08)",
        }}
      >

        <h1
          style={{
            color: "#47685F",
            marginBottom: "10px",
          }}
        >
          Book Appointment
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "35px",
          }}
        >
          Select your preferred appointment
          date and time.
        </p>

        {/* DATE */}

        <label>

          Appointment Date

        </label>

        <input

          type="date"

          value={selectedDate}

          min={
            new Date()
              .toISOString()
              .split("T")[0]
          }

          onChange={handleDateChange}

          style={inputStyle}

        />

        {/* MESSAGE */}

        {

          message && (

            <div
              style={{
                background:
                  "#FFF7DD",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "25px",
                color: "#856404",
                fontWeight: "600",
              }}
            >

              {message}

            </div>

          )

        }

        {/* LOADING */}

        {

          loadingSlots && (

            <p
              style={{
                color: "#47685F",
                marginBottom: "20px",
              }}
            >

              Loading available slots...

            </p>

          )

        }

        {/* SLOT */}

        <label>

          Available Time Slots

        </label>

        <select

          value={selectedTime}

          onChange={(e)=>

            setSelectedTime(
              e.target.value
            )

          }

          style={inputStyle}

        >

          <option value="">

            Select Time Slot

          </option>

          {

            availableSlots.map(

              (slot)=>(

                <option

                  key={slot}

                  value={slot}

                >

                  {

                    formatTime(
                      slot
                    )

                  }

                </option>

              )

            )

          }

        </select>

        {/* APPOINTMENT TYPE */}

        <label>

          Appointment Type

        </label>

        <select

          value={appointmentType}

          onChange={(e)=>

            setAppointmentType(

              e.target.value

            )

          }

          style={inputStyle}

        >

          <option>

            Initial Consultation

          </option>

          <option>

            Follow-up

          </option>

          <option>

            Couple Therapy

          </option>

          <option>

            Family Therapy

          </option>

        </select>

        {/* SESSION */}

        <label>

          Session Type

        </label>

        <select
  value="Online"
  disabled
  style={{
    ...inputStyle,
    background: "#F5F5F5",
    cursor: "not-allowed",
  }}
>
  <option value="Online">
    Online Consultation
  </option>
</select>

        {/* CONCERN */}

        <label>

          Brief Concern

        </label>

        <textarea

          value={concern}

          onChange={(e)=>

            setConcern(

              e.target.value

            )

          }

          placeholder="Briefly describe what you'd like support with during this session..."

          style={textAreaStyle}

        />
                {/* CONSULTATION SUMMARY */}

        <div
          style={{
            marginTop: "35px",
            background: "#F8FAF9",
            border: "1px solid #DCE7E3",
            borderRadius: "15px",
            padding: "25px",
          }}
        >

          <h2
            style={{
              color: "#47685F",
              marginTop: 0,
              marginBottom: "20px",
            }}
          >
            Consultation Summary
          </h2>

          <div style={infoRow}>
            <strong>Therapist</strong>
            <span>
              {clinicSettings?.therapistName ||
                "Harsha Aman"}
            </span>
          </div>

          <div style={infoRow}>
            <strong>Consultation Fee</strong>
            <span>
              ₹
              {clinicSettings?.consultationFee ||
                800}
            </span>
          </div>

          <div style={infoRow}>
            <strong>Session Duration</strong>
            <span>
              {clinicSettings?.sessionDuration ||
                60} Minutes
            </span>
          </div>

          <div style={infoRow}>
            <strong>Appointment</strong>
            <span>{appointmentType}</span>
          </div>

          <div style={infoRow}>
            <strong>Session</strong>
            <span>{sessionType}</span>
          </div>

          <div style={infoRow}>
            <strong>Date</strong>
            <span>
              {selectedDate || "--"}
            </span>
          </div>

          <div style={infoRow}>
            <strong>Time</strong>
            <span>
              {selectedTime
                ? formatTime(selectedTime)
                : "--"}
            </span>
          </div>

        </div>

        {/* BOOK BUTTON */}

        <button

          onClick={bookAppointment}

          disabled={
            bookingLoading ||
            loadingSlots ||
            availableSlots.length === 0
          }

          style={{
            ...buttonStyle,
            marginTop: "35px",
            opacity:
              bookingLoading ||
              loadingSlots ||
              availableSlots.length === 0
                ? 0.7
                : 1,
          }}

        >

          {

            bookingLoading

              ? "Submitting..."

              : "Request Appointment"

          }

        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#666",
            lineHeight: "1.6",
          }}
        >
          After submitting your appointment request,
          Harsha will review it.
          <br />
          Once approved, you'll receive an email
          containing your Google Meet link and
          payment instructions.
        </p>

      </div>

    </div>

  );

}

export default BookAppointment;