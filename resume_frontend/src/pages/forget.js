
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Forget() {
  const [email, setemail] = useState("");
  const [otp, setotp] = useState("");
  const [password, setpassword] = useState("");
  const [step, setstep] = useState(1);
  const navigate = useNavigate();

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
    fetch("http://127.0.0.1:8000/api/verify-otp/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp }),
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
        console.log("Reset response:", res.status, data);
        if (res.ok) {
          alert("Password reset successful.");
          navigate("/login");  // 🔁 You’ll login manually from here
        } else {
          alert(data.error || data.detail || "Reset failed");
        }
      })
      .catch(err => {
        console.error("Reset error:", err);
        alert("Reset request failed");
      });
  }

  return (
    <>
      {step === 1 && (
        <>
          <h2>Forgot Password</h2>
          <input
            type="email"
            value={email}
            onChange={e => setemail(e.target.value)}
            placeholder="Enter email"
          />
          <button onClick={sendOTP} disabled={!email}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Verify OTP</h2>
          <input
            type="text"
            value={otp}
            onChange={e => setotp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={verifyOTP} disabled={!otp}>Verify</button>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Reset Password</h2>
          <input
            type="password"
            value={password}
            onChange={e => setpassword(e.target.value)}
            placeholder="Enter new password"
          />
          <button onClick={resetPassword} disabled={!password}>Reset</button>
        </>
      )}
    </>
  );
}

export { Forget };