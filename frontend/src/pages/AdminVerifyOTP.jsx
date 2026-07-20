import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

function AdminVerifyOTP() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const verifyOTP = async () => {

    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    try {

      setLoading(true);

     const res = await axios.post(
  "/password/verify-otp",
  {
    email,
    otp,
    role: "admin",
  }
);

      alert(res.data.message);

      navigate("/admin-reset-password", {
        state: {
          email,
        },
      });

    }

    catch (err) {

      alert(
        err.response?.data?.message ||
        "OTP verification failed."
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

<div
style={{
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#FAF7F2",
}}
>

<div
style={{
width:"430px",
background:"white",
padding:"40px",
borderRadius:"18px",
boxShadow:"0 10px 30px rgba(0,0,0,.08)",
}}
>

<h1
style={{
textAlign:"center",
color:"#47685F",
}}
>

Verify OTP

</h1>

<p
style={{
textAlign:"center",
color:"#666",
marginBottom:"25px",
}}
>

Enter the OTP sent to your email.

</p>

<input
type="text"
placeholder="Enter OTP"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
style={inputStyle}
/>

<button
onClick={verifyOTP}
disabled={loading}
style={{
...buttonStyle,
opacity:loading?0.7:1,
}}
>

{loading?"Verifying...":"Verify OTP"}

</button>

</div>

</div>

);

}

const inputStyle={

width:"100%",
padding:"15px",
marginBottom:"20px",
borderRadius:"10px",
border:"1px solid #DDD",
fontSize:"16px",
boxSizing:"border-box",

};

const buttonStyle={

width:"100%",
padding:"15px",
border:"none",
borderRadius:"10px",
background:"#47685F",
color:"white",
fontSize:"16px",
fontWeight:"600",
cursor:"pointer",

};

export default AdminVerifyOTP;