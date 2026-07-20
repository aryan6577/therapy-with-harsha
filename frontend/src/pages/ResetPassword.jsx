import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const [password,setPassword]=useState("");

  const [confirm,setConfirm]=useState("");

  const resetPassword=async()=>{

    if(password!==confirm){

      alert("Passwords do not match.");

      return;

    }

    try{

      const res = await axios.post(
  "/password/reset",
  {
    email,
    password,
    confirmPassword: confirm,
    role: "patient",
  }
);

      alert(res.data.message);

      navigate("/login");

    }

    catch(err){

      alert(

        err.response?.data?.message ||

        "Unable to reset password."

      );

    }

  };

  return(

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
width:"450px",
background:"white",
padding:"40px",
borderRadius:"20px",
boxShadow:"0 10px 30px rgba(0,0,0,.08)",
}}
>

<h2
style={{
textAlign:"center",
color:"#47685F",
}}
>

Create New Password

</h2>

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
value={confirm}
onChange={(e)=>setConfirm(e.target.value)}
style={inputStyle}
/>

<button
onClick={resetPassword}
style={buttonStyle}
>

Update Password

</button>

</div>

</div>

);

}

const inputStyle={

width:"100%",

padding:"15px",

marginTop:"20px",

borderRadius:"10px",

border:"1px solid #DDD",

boxSizing:"border-box",

};

const buttonStyle={

width:"100%",

marginTop:"30px",

padding:"15px",

background:"#47685F",

color:"white",

border:"none",

borderRadius:"10px",

cursor:"pointer",

};

export default ResetPassword;