import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/admin/AdminLayout";

function ClinicSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [qrFile, setQrFile] = useState(null);

const [uploadingQr, setUploadingQr] =
  useState(false);
  const token = localStorage.getItem("token");
  const [settings, setSettings] = useState({
    clinicName: "",
    therapistName: "",
    qualification: "",
    experience: "",
    consultationFee: "",
    sessionDuration: 60,
    currency: "INR",
    upiId: "",
    qrCode: "",
    paymentInstructions: "",
    cancellationPolicy: "",
    refundPolicy: "",
    autoGenerateMeet: true,
    autoEmailPatient: true,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await axios.get(
  "http://localhost:5000/api/settings",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setSettings(res.data.settings);

    } catch (err) {
      alert("Unable to load settings.");
    }

    setLoading(false);
  };

const saveSettings = async () => {

  try {

    setSaving(true);

    const res = await axios.put(

      "http://localhost:5000/api/settings",

      settings,

      {

        headers: {

          Authorization: `Bearer ${token}`,

        },

      }

    );

    alert(res.data.message);

  }

  catch (err) {

    console.log(err);

    alert(

      err.response?.data?.message ||

      "Unable to save settings."

    );

  }

  finally {

    setSaving(false);

  }

};
  const uploadQrCode = async () => {

  if (!qrFile) {

    alert("Please choose a QR image.");

    return;

  }

  try {

    setUploadingQr(true);

    const token =
      localStorage.getItem("token");

    const formData = new FormData();

    formData.append(
      "paymentScreenshot",
      qrFile
    );

    const res = await axios.post(

      "http://localhost:5000/api/settings/upload-qr",

      formData,

      {

        headers: {

          Authorization: `Bearer ${token}`,

          "Content-Type":
            "multipart/form-data",

        },

      }

    );

    setSettings(res.data.settings);

    alert("QR Code uploaded successfully.");

  }

  catch (err) {

    alert(

      err.response?.data?.message ||

      "QR upload failed."

    );

  }

  finally {

    setUploadingQr(false);

  }

};
  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setSettings({

      ...settings,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    });

  };

  if (loading)
    return (
      <AdminLayout>
        <h2>Loading...</h2>
      </AdminLayout>
    );

  return (
    <AdminLayout>

      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >

        <h1
          style={{
            color: "#47685F",
            marginBottom: "35px",
          }}
        >
          Clinic Settings
        </h1>

        <Input
          label="Clinic Name"
          name="clinicName"
          value={settings.clinicName}
          onChange={handleChange}
        />

        <Input
          label="Therapist Name"
          name="therapistName"
          value={settings.therapistName}
          onChange={handleChange}
        />

        <Input
          label="Qualification"
          name="qualification"
          value={settings.qualification}
          onChange={handleChange}
        />

        <Input
          label="Experience"
          name="experience"
          value={settings.experience}
          onChange={handleChange}
        />

        <Input
          label="Consultation Fee (₹)"
          type="number"
          name="consultationFee"
          value={settings.consultationFee}
          onChange={handleChange}
        />

        <label>Session Duration</label>

        <select
          name="sessionDuration"
          value={settings.sessionDuration}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value={30}>30 Minutes</option>
          <option value={45}>45 Minutes</option>
          <option value={60}>60 Minutes</option>
          <option value={90}>90 Minutes</option>
        </select>

        <Input
          label="UPI ID"
          name="upiId"
          value={settings.upiId}
          onChange={handleChange}
        />
        {/* ============================= */}
{/* PAYMENT QR CODE */}
{/* ============================= */}

<label
  style={{
    fontWeight: "600",
  }}
>
  Payment QR Code
</label>

{
settings.qrCode && (

<div
  style={{
    marginTop: "15px",
    marginBottom: "20px",
    textAlign: "center",
  }}
>

  <img

    src={settings.qrCode}

    alt="Payment QR"

    style={{

      width: "220px",

      borderRadius: "12px",

      border: "1px solid #DDD",

    }}

  />

</div>

)
}

<input

  type="file"

  accept="image/*"

  style={inputStyle}

  onChange={(e)=>

    setQrFile(

      e.target.files[0]

    )

  }

/>

<button

  type="button"

  onClick={uploadQrCode}

  style={{

    width: "100%",

    padding: "14px",

    border: "none",

    borderRadius: "10px",

    marginBottom: "25px",

    background: "#47685F",

    color: "white",

    fontWeight: "600",

    cursor: "pointer",

  }}

>

{

uploadingQr

?

"Uploading QR..."

:

"Upload QR Code"

}

</button>
        <TextArea
          label="Payment Instructions"
          name="paymentInstructions"
          value={settings.paymentInstructions}
          onChange={handleChange}
        />

        <TextArea
          label="Cancellation Policy"
          name="cancellationPolicy"
          value={settings.cancellationPolicy}
          onChange={handleChange}
        />

        <TextArea
          label="Refund Policy"
          name="refundPolicy"
          value={settings.refundPolicy}
          onChange={handleChange}
        />

        <div
          style={{
            marginTop: "25px",
          }}
        >

          <label>

            <input
              type="checkbox"
              name="autoGenerateMeet"
              checked={settings.autoGenerateMeet}
              onChange={handleChange}
            />

            {" "}Auto Generate Google Meet

          </label>

        </div>

        <div
          style={{
            marginTop: "15px",
          }}
        >

          <label>

            <input
              type="checkbox"
              name="autoEmailPatient"
              checked={settings.autoEmailPatient}
              onChange={handleChange}
            />

            {" "}Auto Email Patient

          </label>

        </div>

        <button
          onClick={saveSettings}
          style={buttonStyle}
        >
          {saving
            ? "Saving..."
            : "Save Settings"}
        </button>

      </div>

    </AdminLayout>
  );
}

function Input({
  label,
  ...props
}) {
  return (
    <>
      <label>{label}</label>

      <input
        {...props}
        style={inputStyle}
      />
    </>
  );
}

function TextArea({
  label,
  ...props
}) {
  return (
    <>
      <label>{label}</label>

      <textarea
        {...props}
        rows="4"
        style={inputStyle}
      />
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "8px",
  marginBottom: "25px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "15px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  marginTop: "35px",
  padding: "16px",
  border: "none",
  borderRadius: "10px",
  background: "#47685F",
  color: "white",
  fontSize: "17px",
  cursor: "pointer",
  fontWeight: "600",
};

export default ClinicSettings;