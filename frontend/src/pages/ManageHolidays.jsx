import { useEffect, useState } from "react";
import axios from "axios";

function ManageHolidays() {

  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [holidays, setHolidays] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadHolidays();
  }, []);

  // ==========================================
  // Format Date
  // ==========================================

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  };

  // ==========================================
  // Load Holidays
  // ==========================================

  const loadHolidays = async () => {

    try {

      const res = await axios.get(
        "${API_URL}/api/holiday"
      );

      if (res.data.success) {

        setHolidays(res.data.holidays);

      }

    } catch (err) {

      console.log(err);

    }

  };

  // ==========================================
  // Add Holiday
  // ==========================================

  const addHoliday = async () => {

    if (!date) {

      alert("Please select a holiday.");

      return;

    }

    try {

      const res = await axios.post(

        "${API_URL}/api/holiday",

        {

          date,

          reason,

        },

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      alert(res.data.message);

      setDate("");

      setReason("");

      loadHolidays();

    } catch (err) {

      alert(

        err.response?.data?.message ||

        "Unable to save holiday."

      );

    }

  };

  // ==========================================
  // Delete Holiday
  // ==========================================

  const deleteHoliday = async (id) => {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this holiday?"

    );

    if (!confirmDelete) return;

    try {

      await axios.delete(

        `${API_URL}/api/holiday/${id}`,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      alert("Holiday deleted successfully.");

      loadHolidays();

    } catch (err) {

      alert(

        err.response?.data?.message ||

        "Unable to delete holiday."

      );

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#F5F6FA",
        padding: "40px",
      }}
    >

      <h1
        style={{
          color: "#47685F",
          marginBottom: "30px",
          fontSize: "48px",
        }}
      >
        Holiday Manager
      </h1>

      {/* Add Holiday */}

      <div
        style={{
          background: "white",
          padding: "35px",
          borderRadius: "20px",
          marginBottom: "40px",
          boxShadow: "0 8px 25px rgba(0,0,0,.08)",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Add Holiday
        </h2>

        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) =>
            setDate(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Reason (Optional)"
          value={reason}
          onChange={(e) =>
            setReason(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={addHoliday}
          style={buttonStyle}
        >
          Add Holiday
        </button>

      </div>

      {/* Holiday List */}

      <div
        style={{
          background: "white",
          padding: "35px",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,.08)",
        }}
      >

        <h2
          style={{
            marginBottom: "25px",
          }}
        >
          Upcoming Holidays
        </h2>

        {

          holidays.length === 0 ? (

            <p>No holidays added.</p>

          ) : (

            holidays.map((holiday) => (

              <div

                key={holiday._id}

                style={{

                  display: "flex",

                  justifyContent: "space-between",

                  alignItems: "center",

                  padding: "20px 0",

                  borderBottom: "1px solid #EEE",

                }}

              >

                <div>

                  <h3
                    style={{
                      margin: 0,
                      color: "#47685F",
                    }}
                  >
                    {formatDate(
                      holiday.date
                    )}
                  </h3>

                  <p
                    style={{
                      marginTop: "8px",
                      color: "#666",
                    }}
                  >
                    {holiday.reason}
                  </p>

                </div>

                <button

                  onClick={() =>
                    deleteHoliday(
                      holiday._id
                    )
                  }

                  style={{

                    background: "#E74C3C",

                    color: "white",

                    border: "none",

                    padding:
                      "12px 22px",

                    borderRadius: "10px",

                    cursor: "pointer",

                    fontWeight: "600",

                  }}

                >

                  Delete

                </button>

              </div>

            ))

          )

        }

      </div>

    </div>

  );

}

const inputStyle = {

  width: "100%",

  padding: "15px",

  marginBottom: "18px",

  borderRadius: "10px",

  border: "1px solid #DDD",

  fontSize: "16px",

  boxSizing: "border-box",

};

const buttonStyle = {

  background: "#47685F",

  color: "white",

  border: "none",

  padding: "14px 26px",

  borderRadius: "10px",

  cursor: "pointer",

  fontSize: "16px",

  fontWeight: "600",

};

export default ManageHolidays;