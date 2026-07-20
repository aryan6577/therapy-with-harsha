import axios from "../../utils/axiosInstance";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function IntakeForm() {

  const navigate = useNavigate();

  const emptyForm = {
    fullName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    occupation: "",
    city: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    reason: "",
    previousTherapy: "",
    medication: "",
    medicalCondition: "",
    consent: false,
  };

  const [step, setStep] = useState(1);

  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    loadProfile();
  }, []);
const [loading, setLoading] = useState(true);
const loadProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
  "/patient/profile",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    const user = res.data.user;
const profile = res.data.profile;
// If profile is already completed,
// don't allow opening the intake form again.
if (profile?.profileCompleted) {
  navigate("/dashboard");
  return;
}

setFormData({
  ...emptyForm,

  // Auto-fill from User account
  fullName: user?.fullName || "",
  email: user?.email || "",
  phone: user?.phone || "",

  // Existing intake data (if any)
  ...(profile || {}),
});
  } catch (err) {
    console.log(err);
    setFormData(emptyForm);
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData({

      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    });

  };

  const submitProfile = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
  "/patient/profile",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      alert(
        "Profile Saved Successfully"
      );

      navigate(
        "/profile-completed"
      );

    } catch (err) {

      alert(

        err.response?.data?.message ||

        "Unable to save profile"

      );

    }

  };
  const inputStyle = {

  width: "100%",

  padding: "15px",

  marginBottom: "20px",

  borderRadius: "10px",

  border: "1px solid #DDD",

  fontSize: "16px",

  boxSizing: "border-box",

};



const textAreaStyle = {

  ...inputStyle,

  minHeight: "120px",

  resize: "vertical",

};



const buttonStyle = {

  padding: "14px 28px",

  borderRadius: "10px",

  border: "none",

  background: "#E6E6E6",

  cursor: "pointer",

  fontSize: "16px",

  fontWeight: "600",

  transition: "0.3s",

};
if (loading) {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      Loading...
    </div>
  );
}
    return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAF7F2",
        padding: "50px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            color: "#47685F",
            textAlign: "center",
          }}
        >
          Patient Intake Form
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#777",
          }}
        >
          Step {step} of 5
        </p>

        <div
          style={{
            height: "8px",
            background: "#EAEAEA",
            borderRadius: "20px",
            margin: "25px 0",
          }}
        >
          <div
            style={{
              width: `${step * 20}%`,
              background: "#47685F",
              height: "100%",
              borderRadius: "20px",
              transition: "0.3s",
            }}
          />
        </div>

        {step === 1 && (
          <>
            <input
  name="fullName"
  placeholder="Full Name"
  value={formData.fullName}
  readOnly
  style={{
    ...inputStyle,
    background: "#F5F5F5",
    color: "#666",
    cursor: "not-allowed",
  }}
/>

            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              style={inputStyle}
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
  name="phone"
  placeholder="Phone Number"
  value={formData.phone}
  readOnly
  style={{
    ...inputStyle,
    background: "#F5F5F5",
    color: "#666",
    cursor: "not-allowed",
  }}
/>

            <input
  name="email"
  placeholder="Email Address"
  value={formData.email}
  readOnly
  style={{
    ...inputStyle,
    background: "#F5F5F5",
    color: "#666",
    cursor: "not-allowed",
  }}
/>
          </>
        )}

        {step === 2 && (
          <>
            <input
              name="occupation"
              placeholder="Occupation"
              value={formData.occupation}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              style={inputStyle}
            />
          </>
        )}

        {step === 3 && (
          <>
            <textarea
              name="reason"
              placeholder="Reason for Therapy"
              value={formData.reason}
              onChange={handleChange}
              style={textAreaStyle}
            />

            <select
              name="previousTherapy"
              value={formData.previousTherapy}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">
                Previous Therapy?
              </option>

              <option>Yes</option>
              <option>No</option>
            </select>

            <input
              name="medication"
              placeholder="Current Medication"
              value={formData.medication}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="medicalCondition"
              placeholder="Medical Conditions"
              value={formData.medicalCondition}
              onChange={handleChange}
              style={inputStyle}
            />
          </>
        )}

        {step === 4 && (
          <>
            <input
              name="emergencyName"
              placeholder="Emergency Contact Name"
              value={formData.emergencyName}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="emergencyRelation"
              placeholder="Relationship"
              value={formData.emergencyRelation}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="emergencyPhone"
              placeholder="Emergency Contact Phone"
              value={formData.emergencyPhone}
              onChange={handleChange}
              style={inputStyle}
            />
          </>
        )}

        {step === 5 && (
          <>
            <label
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
              />

              I agree to the Privacy Policy and Consent Terms.
            </label>
          </>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          <button
            disabled={step === 1}
            onClick={() =>
              setStep(step - 1)
            }
            style={buttonStyle}
          >
            Previous
          </button>

          {step < 5 ? (
            <button
              onClick={() =>
                setStep(step + 1)
              }
              style={buttonStyle}
            >
              Next
            </button>
          ) : (
            <button
              onClick={submitProfile}
              style={{
                ...buttonStyle,
                background: "#47685F",
                color: "white",
              }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
  

} // End of IntakeForm Component

export default IntakeForm;