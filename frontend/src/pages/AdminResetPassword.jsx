import { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

function AdminResetPassword() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {

    if (!password || !confirmPassword) {

      alert("Please fill all fields.");

      return;

    }

    if (password !== confirmPassword) {

      alert("Passwords do not match.");

      return;

    }

    try {

      setLoading(true);

      const res = await axios.post(
  "/password/reset",
  {
    email,
    password,
    confirmPassword,
    role: "admin",
  }
);
      alert(res.data.message);

      navigate("/admin/login");

    }

    catch (err) {

      alert(

        err.response?.data?.message ||

        "Unable to reset password."

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

Create New Password

</h1>

<p
style={{
textAlign:"center",
color:"#666",
marginBottom:"25px",
}}
>

Enter your new therapist password.

</p>

<input
type="password"
placeholder="New Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={inputStyle}
/>

<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
style={inputStyle}
/>

<button
onClick={resetPassword}
disabled={loading}
style={{
...buttonStyle,
opacity:loading?0.7:1,
}}
>

{loading ? "Updating..." : "Update Password"}

</button>

</div>

</div>

);

}

const inputStyle = {

width:"100%",
padding:"15px",
marginBottom:"20px",
borderRadius:"10px",
border:"1px solid #DDD",
fontSize:"16px",
boxSizing:"border-box",

};

const buttonStyle = {

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

export default AdminResetPassword;