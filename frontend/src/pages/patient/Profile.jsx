import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/patient/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile({
  ...(res.data.profile || {}),

  fullName: res.data.user?.fullName || "",
  email: res.data.user?.email || "",
  phone: res.data.user?.phone || "",
});
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/patient/profile",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully.");
    } catch (err) {
      alert("Unable to update profile.");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div style={{ padding: 50 }}>
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAF7F2",
        padding: "45px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "35px",
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
          maxWidth: "1100px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            color: "#47685F",
            marginBottom: "30px",
          }}
        >
          My Profile
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "20px",
          }}
        >
          <Input
            label="Full Name"
            name="fullName"
            value={profile.fullName || ""}
            onChange={handleChange}
            readOnly
          />

          <Input
            label="Email"
            name="email"
            value={profile.email || ""}
            onChange={handleChange}
            readonly
          />

          <Input
            label="Mobile"
            name="phone"
            value={profile.phone || ""}
            onChange={handleChange}
            readonly
          />

          <Input
            label="Gender"
            name="gender"
            value={profile.gender || ""}
            onChange={handleChange}
          />

          <Input
            label="Date of Birth"
            type="date"
            name="dob"
            value={profile.dob || ""}
            onChange={handleChange}
          />

          <Input
            label="Occupation"
            name="occupation"
            value={profile.occupation || ""}
            onChange={handleChange}
          />

          <Input
            label="City"
            name="city"
            value={profile.city || ""}
            onChange={handleChange}
          />

          <Input
            label="State"
            name="state"
            value={profile.state || ""}
            onChange={handleChange}
          />

          <Input
            label="Emergency Contact"
            name="emergencyContact"
            value={profile.emergencyContact || ""}
            onChange={handleChange}
          />

          <Input
            label="Preferred Language"
            name="preferredLanguage"
            value={profile.preferredLanguage || ""}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={saveProfile}
          style={{
            marginTop: "35px",
            background: "#47685F",
            color: "white",
            border: "none",
            padding: "14px 28px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          color: "#47685F",
          fontWeight: "600",
        }}
      >
        {label}
      </label>

      <input
        {...props}
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export default Profile;