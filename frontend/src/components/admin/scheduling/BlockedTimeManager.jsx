import { useEffect, useState } from "react";
import axios from "axios";

function BlockedTimeManager() {

  const token = localStorage.getItem("token");

  const [blockedSlots, setBlockedSlots] = useState([]);

  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    reason: "",
  });

  useEffect(() => {

    loadBlockedSlots();

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
  // Load Blocked Slots
  // ==========================================

  const loadBlockedSlots = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/blocked-slot"
      );

      if (res.data.success) {

        setBlockedSlots(res.data.blockedSlots);

      }

    }

    catch (err) {

      console.log(err);

    }

  };

  // ==========================================
  // Add Blocked Slot
  // ==========================================

  const addBlockedSlot = async () => {

    if (
      !form.date ||
      !form.startTime ||
      !form.endTime
    ) {

      alert(
        "Please select Date, Start Time and End Time."
      );

      return;

    }

    // End Time must be after Start Time

    if (
      form.endTime <= form.startTime
    ) {

      alert(
        "End Time must be later than Start Time."
      );

      return;

    }

    // Past date check

    const today =
      new Date().toISOString().split("T")[0];

    if (form.date < today) {

      alert(
        "Cannot block a past date."
      );

      return;

    }

    try {

      const res = await axios.post(

        `${API_URL}/api/blocked-slot",

        form,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      alert(res.data.message);

      setForm({

        date: "",

        startTime: "",

        endTime: "",

        reason: "",

      });

      loadBlockedSlots();

    }

    catch (err) {

      alert(

        err.response?.data?.message ||

        "Unable to save blocked slot."

      );

    }

  };

  // ==========================================
  // Delete Blocked Slot
  // ==========================================

  const deleteBlockedSlot = async (id) => {

    const confirmDelete = window.confirm(

      "Delete this blocked slot?"

    );

    if (!confirmDelete) return;

    try {

      await axios.delete(

        `${API_URL}/api/blocked-slot/${id}`,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      alert("Blocked slot deleted.");

      loadBlockedSlots();

    }

    catch (err) {

      alert(

        err.response?.data?.message ||

        "Unable to delete."

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
          fontSize: "42px",
          marginBottom: "30px",
        }}
      >
        Block Time Slots
      </h1>

      <div
        style={{
          background: "white",
          padding: "35px",
          borderRadius: "20px",
          marginBottom: "40px",
          boxShadow:
            "0 8px 25px rgba(0,0,0,.08)",
        }}
      >

        <h2
          style={{
            marginBottom: "25px",
            color: "#47685F",
          }}
        >
          Block Time Slot
        </h2>

        <label style={labelStyle}>
          Date
        </label>

        <input
          type="date"
          value={form.date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e)=>
            setForm({
              ...form,
              date:e.target.value,
            })
          }
          style={inputStyle}
        />

        <label style={labelStyle}>
          Start Time
        </label>

        <input
          type="time"
          value={form.startTime}
          onChange={(e)=>
            setForm({
              ...form,
              startTime:e.target.value,
            })
          }
          style={inputStyle}
        />

        <label style={labelStyle}>
          End Time
        </label>

        <input
          type="time"
          value={form.endTime}
          onChange={(e)=>
            setForm({
              ...form,
              endTime:e.target.value,
            })
          }
          style={inputStyle}
        />

        <label style={labelStyle}>
          Reason (Optional)
        </label>

        <input
          type="text"
          placeholder="Meeting / Personal Work / Emergency"
          value={form.reason}
          onChange={(e)=>
            setForm({
              ...form,
              reason:e.target.value,
            })
          }
          style={inputStyle}
        />

        <button
          onClick={addBlockedSlot}
          style={buttonStyle}
        >
          Save Blocked Slot
        </button>

      </div>

      <div
        style={{
          background:"white",
          padding:"35px",
          borderRadius:"20px",
          boxShadow:
            "0 8px 25px rgba(0,0,0,.08)",
        }}
      >

        <h2
          style={{
            marginBottom:"25px",
            color:"#47685F",
          }}
        >
          Blocked Time Slots
        </h2>

        {

          blockedSlots.length===0 ?

          (

            <p
              style={{
                color:"#777",
              }}
            >
              No blocked time slots added.
            </p>

          )

          :

          blockedSlots.map((slot)=>(

            <div

              key={slot._id}

              style={{

                display:"flex",

                justifyContent:"space-between",

                alignItems:"center",

                padding:"18px 0",

                borderBottom:
                  "1px solid #EEE",

              }}

            >

              <div>

                <h3
                  style={{
                    margin:0,
                    color:"#47685F",
                  }}
                >
                  {formatDate(slot.date)}
                </h3>

                <p
                  style={{
                    marginTop:"8px",
                    color:"#666",
                  }}
                >
                  <strong>
                    {slot.startTime}
                  </strong>

                  {"  →  "}

                  <strong>
                    {slot.endTime}
                  </strong>
                </p>

                <p
                  style={{
                    marginTop:"5px",
                    color:"#888",
                  }}
                >
                  {
                    slot.reason ||
                    "Blocked Time"
                  }
                </p>

              </div>

              <button

                onClick={()=>
                  deleteBlockedSlot(
                    slot._id
                  )
                }

                style={{

                  background:"#E74C3C",

                  color:"white",

                  border:"none",

                  padding:"12px 22px",

                  borderRadius:"10px",

                  cursor:"pointer",

                  fontWeight:"600",

                }}

              >

                Delete

              </button>

            </div>

          ))

        }

      </div>

    </div>

  );

}

const labelStyle={

  display:"block",

  marginBottom:"8px",

  color:"#47685F",

  fontWeight:"600",

};

const inputStyle={

  width:"100%",

  padding:"14px",

  marginBottom:"20px",

  borderRadius:"10px",

  border:"1px solid #DDD",

  fontSize:"16px",

  boxSizing:"border-box",

};

const buttonStyle={

  background:"#47685F",

  color:"white",

  border:"none",

  padding:"14px 28px",

  borderRadius:"10px",

  cursor:"pointer",

  fontSize:"16px",

  fontWeight:"600",

};

export default BlockedTimeManager;