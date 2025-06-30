// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// function Forget() {
//   const [email, setemail] = useState("");
//   const [otp, setotp] = useState(Array(6).fill(""));
//   const [password, setpassword] = useState("");
//   const [step, setstep] = useState(1);
//   const navigate = useNavigate();
//   const inputRefs = useRef([]);

//   function sendOTP() {
//     fetch("http://127.0.0.1:8000/api/forgot-password/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email }),
//       credentials: "include"
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.message) {
//           alert("OTP sent to your email");
//           setstep(2);
//         } else {
//           alert(data.error || "Error sending OTP");
//         }
//       })
//       .catch(err => {
//         console.error("OTP error:", err);
//         alert("Server error while sending OTP");
//       });
//   }

//   function verifyOTP() {
//     const joinedOTP = otp.join("");
//     fetch("http://127.0.0.1:8000/api/verify-otp/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ otp: joinedOTP }),
//       credentials: "include"
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.message === "OTP verified successfully." || data.message === "OTP verified") {
//           setstep(3);
//         } else {
//           alert(data.error || "Invalid OTP");
//         }
//       })
//       .catch(err => {
//         console.error("Verify error:", err);
//         alert("Error verifying OTP");
//       });
//   }

//   function resetPassword() {
//     fetch("http://127.0.0.1:8000/api/reset/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({
//         email: email,
//         new_password: password
//       })
//     })
//       .then(async res => {
//         const data = await res.json();
//         console.log("Reset response:", res.status, data);
//         if (res.ok) {
//           alert("Password reset successful.");
//           navigate("/login");  
//         } else {
//           alert(data.error || data.detail || "Reset failed");
//         }
//       })
//       .catch(err => {
//         console.error("Reset error:", err);
//         alert("Reset request failed");
//       });
//   }

//   const handleOTPChange = (e, index) => {
//     const value = e.target.value;
//     if (/^[0-9]?$/.test(value)) {
//       const newOTP = [...otp];
//       newOTP[index] = value;
//       setotp(newOTP);
//       if (value && index < 5) {
//         inputRefs.current[index + 1].focus();
//       }
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   return (
//     <>
//       {step === 1 && (
//         <div className="out">
//           <div className="forget1">
//             <h1>Forgot password?</h1>
//             <h5 className="forget-subtitle">No worries, we'll send you reset instructions</h5>
//             <div className="email">
//               <h5>Email Address</h5>
//             </div>
//             <input
//               type="email"
//               value={email}
//               onChange={e => setemail(e.target.value)}
//               placeholder="Enter email"
//               className="emailinput"
//             />
//             <button className="login-button" onClick={sendOTP} disabled={!email}>Send OTP</button>
//             <button className="login-button" onClick={() => navigate("/login")}>Back to login</button>
//           </div>
//         </div>
//       )}

//       {step === 2 && (
//         <div className="out">
//           <div className="forget1">
//             <h2 className="login-heading" >Verify OTP</h2>
//             <div className="otp-input-group">
//               {otp.map((digit, idx) => (
//                 <input
//                   key={idx}
//                   type="text"
//                   maxLength="1"
//                   value={digit}
//                   onChange={e => handleOTPChange(e, idx)}
//                   onKeyDown={e => handleKeyDown(e, idx)}
//                   ref={el => (inputRefs.current[idx] = el)}
//                   className="otp-box1"
//                 />
//               ))}
//             </div>
//             <button onClick={verifyOTP} disabled={otp.includes("")}>Verify</button>
//           </div>
//         </div>
//       )}

//       {step === 3 && (
//         <div className="out">
//           <div className="forget1">
//             <h2>Reset Password</h2>
//             <input
//               type="password"
//               value={password}
//               onChange={e => setpassword(e.target.value)}
//               placeholder="Enter new password"
//             />
//             <button className="login-button" onClick={resetPassword} disabled={!password}>Reset</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export { Forget };

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Forget() {
  const [email, setemail] = useState("");
  const [otp, setotp] = useState(Array(6).fill(""));
  const [password, setpassword] = useState("");
  const [step, setstep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  function sendOTP() {
    fetch("http://127.0.0.1:8000/api/forgot-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert("OTP sent to your email");
          setstep(2);
        } else {
          alert(data.error || "Error sending OTP");
        }
      })
      .catch(err => {
        console.error("OTP error:", err);
        alert("Server error while sending OTP");
      });
  }

  function verifyOTP() {
    const joinedOTP = otp.join("");
    fetch("http://127.0.0.1:8000/api/verify-otp/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp: joinedOTP }),
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "OTP verified successfully." || data.message === "OTP verified") {
          setstep(3);
        } else {
          alert(data.error || "Invalid OTP");
        }
      })
      .catch(err => {
        console.error("Verify error:", err);
        alert("Error verifying OTP");
      });
  }

  function resetPassword() {
    fetch("http://127.0.0.1:8000/api/reset/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        new_password: password
      })
    })
      .then(async res => {
        const data = await res.json();
        if (res.ok) {
          alert("Password reset successful.");
          navigate("/login");
        } else {
          alert(data.error || data.detail || "Reset failed");
        }
      })
      .catch(err => {
        console.error("Reset error:", err);
        alert("Reset request failed");
      });
  }

  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setotp(newOTP);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <>
      {step === 1 && (
        <div className="out">
          <div className="forget1">
            <h1>Forgot password?</h1>
            <h5 className="forget-subtitle">No worries, we'll send you reset instructions</h5>
            <div className="email">
              <h5>Email Address</h5>
            </div>
            <input
              type="email"
              value={email}
              onChange={e => setemail(e.target.value)}
              placeholder="Enter email"
              className="emailinput"
            />
            <button className="login-button" onClick={sendOTP} disabled={!email}>Send OTP</button>
            <button className="login-button" onClick={() => navigate("/login")}>Back to login</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="out">
          <div className="forget1">
            <h2 className="login-heading">Verify OTP</h2>
            <div className="otp-input-group">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={e => handleOTPChange(e, idx)}
                  onKeyDown={e => handleKeyDown(e, idx)}
                  ref={el => (inputRefs.current[idx] = el)}
                  className="otp-box1"
                />
              ))}
            </div>
            <button className="login-button" onClick={verifyOTP} disabled={otp.includes("")}>Verify</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="out">
          <div className="forget1">
            <h2>Reset Password</h2>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setpassword(e.target.value)}
                placeholder="Enter new password"
                style={{ width: "100%", paddingRight: "40px" }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
            <button className="login-button" onClick={resetPassword} disabled={!password}>Reset</button>
          </div>
        </div>
      )}
    </>
  );
}

export { Forget };
