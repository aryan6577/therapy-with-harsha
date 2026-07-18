import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Payment() {

  const { id } = useParams();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [appointment, setAppointment] = useState(null);

  const [settings, setSettings] = useState(null);

  const [transactionId, setTransactionId] =
    useState("");

  const [
    paymentScreenshot,
    setPaymentScreenshot,
  ] = useState(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    loadData();

  }, []);

  // ==========================================
  // Load Appointment & Clinic Settings
  // ==========================================

  const loadData = async () => {

    try {

      const token = localStorage.getItem("token");

const appointmentRes =
  await axios.get(
    `http://localhost:5000/api/appointment/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

      const settingsRes =
        await axios.get(

          "http://localhost:5000/api/settings"

        );

      setAppointment(
        appointmentRes.data.appointment
      );

      setSettings(
        settingsRes.data.settings
      );

    }

    catch (err) {

      console.log(err);

      alert(
        "Unable to load payment details."
      );

    }

  };

  // ==========================================
  // Handle Image Selection
  // ==========================================

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (
      file.size >
      5 * 1024 * 1024
    ) {

      alert(
        "Maximum image size allowed is 5 MB."
      );

      e.target.value = "";

      return;

    }

    setPaymentScreenshot(file);

    setPreview(
      URL.createObjectURL(file)
    );

  };

  // ==========================================
  // Submit Payment
  // ==========================================

  const submitPayment = async () => {

    if (
      appointment?.paymentStatus ===
      "Submitted"
    ) {

      alert(
        "Payment has already been submitted."
      );

      return;

    }

    if (!paymentScreenshot) {

      alert(
        "Please upload your payment screenshot."
      );

      return;

    }

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "transactionId",
        transactionId
      );

      formData.append(
        "paymentScreenshot",
        paymentScreenshot
      );

      const token = localStorage.getItem("token");

await axios.post(
  `http://localhost:5000/api/appointment/submit-payment/${id}`,
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }
);

      alert(

`Payment submitted successfully.

Harsha will verify your payment shortly.

You will receive an email once your payment is approved.`

      );

      navigate("/dashboard");

    }

    catch (err) {

      console.log(err);

      alert(

        err.response?.data?.message ||

        "Payment submission failed."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (
        <div
      style={{
        minHeight: "100vh",
        background: "#F6F7F8",
        padding: "50px",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "auto",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <h1
          style={{
            color: "#47685F",
            marginBottom: "10px",
          }}
        >
          Complete Your Consultation Payment
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "35px",
            lineHeight: "28px",
          }}
        >
          Your appointment has been approved.
          <br />
          Please complete your payment using the QR Code below.
          <br />
          Once Harsha verifies your payment,
          your Google Meet link will automatically
          appear on your dashboard and will also be
          sent to your registered email.
        </p>

        <label>Appointment ID</label>

        <input
          style={inputStyle}
          value={appointment?.appointmentId || ""}
          readOnly
        />

        <label>Consultation Fee</label>

        <input
          style={inputStyle}
          value={`₹ ${appointment?.paymentAmount || ""}`}
          readOnly
        />

        <label>Therapist</label>

        <input
          style={inputStyle}
          value={settings?.therapistName || ""}
          readOnly
        />

        <label>UPI ID</label>

        <input
          style={inputStyle}
          value={settings?.upiId || ""}
          readOnly
        />

        <label>Scan QR Code</label>

        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          {settings?.qrCode ? (

            <img
              src={settings.qrCode}
              alt="QR Code"
              style={{
                width: "260px",
                borderRadius: "15px",
                border: "1px solid #ddd",
              }}
            />

          ) : (

            <div
              style={{
                padding: "40px",
                border: "1px dashed #bbb",
                borderRadius: "12px",
              }}
            >
              QR Code not available.
            </div>

          )}
        </div>

        <label>
          Transaction / UPI Reference Number
          (Optional)
        </label>

        <input
          style={inputStyle}
          placeholder="Enter Transaction ID (Optional)"
          value={transactionId}
          onChange={(e) =>
            setTransactionId(e.target.value)
          }
        />

        <label>
          Upload Payment Screenshot
        </label>

        <input
          type="file"
          accept="image/*"
          style={inputStyle}
          onChange={handleImage}
        />

        <p
          style={{
            color: "#777",
            marginTop: "-10px",
            marginBottom: "20px",
            fontSize: "14px",
            lineHeight: "24px",
          }}
        >
          Supported Formats:
          JPG, JPEG, PNG, WEBP,
          HEIC & HEIF
          <br />
          Maximum File Size : 5 MB
        </p>

        {paymentScreenshot && (

          <div
            style={{
              marginBottom: "25px",
            }}
          >
            <h4
              style={{
                color: "#47685F",
              }}
            >
              Selected File
            </h4>

            <p>
              {paymentScreenshot.name}
            </p>

            <img
              src={preview}
              alt="Preview"
              style={{
                width: "260px",
                borderRadius: "12px",
                border: "1px solid #ddd",
              }}
            />
          </div>

        )}

        <div
          style={{
            background: "#F8FAF9",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
          <h3
            style={{
              color: "#47685F",
              marginTop: 0,
            }}
          >
            Payment Instructions
          </h3>

          <p
            style={{
              lineHeight: "30px",
              color: "#555",
            }}
          >
            {settings?.paymentInstructions}
          </p>
        </div>

        <button
          onClick={submitPayment}
          disabled={loading}
          style={{
            ...buttonStyle,
            opacity: loading ? 0.7 : 1,
            cursor: loading
              ? "not-allowed"
              : "pointer",
          }}
        >
          {loading
            ? "Submitting Payment..."
            : "Submit Payment"}
        </button>

      </div>

    </div>

  );

}

const inputStyle = {

  width: "100%",

  padding: "15px",

  marginTop: "10px",

  marginBottom: "25px",

  borderRadius: "10px",

  border: "1px solid #DDD",

  fontSize: "16px",

  boxSizing: "border-box",

};

const buttonStyle = {

  width: "100%",

  padding: "16px",

  border: "none",

  borderRadius: "10px",

  background: "#47685F",

  color: "white",

  fontSize: "17px",

  fontWeight: "600",

  transition: ".3s",

};

export default Payment;