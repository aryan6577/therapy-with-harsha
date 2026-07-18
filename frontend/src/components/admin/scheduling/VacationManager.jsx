import { useEffect, useState } from "react";
import axios from "axios";

function VacationManager() {

  const token = localStorage.getItem("token");

  const [vacations, setVacations] = useState([]);

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {

    loadVacations();

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
  // Load Vacations
  // ==========================================

  const loadVacations = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/vacation"
      );

      if (res.data.success) {

        setVacations(res.data.vacations);

      }

    }

    catch (err) {

      console.log(err);

    }

  };

  // ==========================================
  // Add Vacation
  // ==========================================

  const addVacation = async () => {

    if (!form.startDate || !form.endDate) {

      alert(
        "Please select both Start Date and End Date."
      );

      return;

    }

    if (

      new Date(form.endDate) <

      new Date(form.startDate)

    ) {

      alert(
        "End date cannot be earlier than Start date."
      );

      return;

    }

    try {

      const res = await axios.post(

        "http://localhost:5000/api/vacation",

        form,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      alert(res.data.message);

      setForm({

        startDate: "",

        endDate: "",

        reason: "",

      });

      loadVacations();

    }

    catch (err) {

      alert(

        err.response?.data?.message ||

        "Unable to save vacation."

      );

    }

  };

  // ==========================================
  // Delete Vacation
  // ==========================================

  const deleteVacation = async (id) => {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this vacation?"

    );

    if (!confirmDelete) return;

    try {

      await axios.delete(

        `http://localhost:5000/api/vacation/${id}`,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      alert("Vacation deleted successfully.");

      loadVacations();

    }

    catch (err) {

      alert(

        err.response?.data?.message ||

        "Unable to delete vacation."

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
        Vacation Manager
      </h1>

      {/* ========================= */}
      {/* Add Vacation */}
      {/* ========================= */}

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
          Add Vacation
        </h2>

        <label
          style={labelStyle}
        >
          Start Date
        </label>

        <input
          type="date"
          value={form.startDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e)=>
            setForm({
              ...form,
              startDate:e.target.value,
            })
          }
          style={inputStyle}
        />

        <label
          style={labelStyle}
        >
          End Date
        </label>

        <input
          type="date"
          value={form.endDate}
          min={
            form.startDate ||
            new Date().toISOString().split("T")[0]
          }
          onChange={(e)=>
            setForm({
              ...form,
              endDate:e.target.value,
            })
          }
          style={inputStyle}
        />

        <label
          style={labelStyle}
        >
          Reason (Optional)
        </label>

        <input
          type="text"
          placeholder="Family Trip / Medical Leave / Personal Leave"
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
          onClick={addVacation}
          style={buttonStyle}
        >
          Save Vacation
        </button>

      </div>

      {/* ========================= */}
      {/* Vacation List */}
      {/* ========================= */}

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
          Upcoming Vacations
        </h2>

        {

          vacations.length===0 ?

          (

            <p
              style={{
                color:"#777",
              }}
            >
              No vacations added.
            </p>

          )

          :

          vacations.map((vacation)=>(

            <div

              key={vacation._id}

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
                  {formatDate(
                    vacation.startDate
                  )}

                  {"  →  "}

                  {formatDate(
                    vacation.endDate
                  )}

                </h3>

                <p
                  style={{
                    marginTop:"8px",
                    color:"#666",
                  }}
                >
                  {
                    vacation.reason ||
                    "Vacation"
                  }
                </p>

              </div>

              <button

                onClick={()=>
                  deleteVacation(
                    vacation._id
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

export default VacationManager;