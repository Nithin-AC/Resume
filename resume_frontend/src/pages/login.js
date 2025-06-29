import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import TextField from "@mui/material/TextField";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "../index.css"

function Login() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handlelogin() {
    if (username && password) {
      fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json; charset=UTF-8" }
      })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(({ status, body }) => {
          if (status === 200 && body.access) {
            localStorage.setItem("token", body.access);
            localStorage.setItem("refreshtoken", body.refresh);
            localStorage.setItem("username", username);
            localStorage.setItem("loginType", "manual");
            navigate("/home");
          } else {
            alert("No such user exists or wrong password");
          }
        })
        .catch(err => {
          console.error("Login error:", err);
          alert("Something went wrong");
        });
    } else {
      alert("Please fill in all fields");
    }
  }

  function handleGoogleSuccess(credentialResponse) {
    const id_token = credentialResponse.credential;

    fetch("http://127.0.0.1:8000/api/auth/google/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token })
    })
      .then(res => res.json())
      .then(data => {
        console.log("GOOGLE LOGIN RESPONSE ===>", data);
        if (data.tokens?.access && data.tokens?.refresh) {
          localStorage.setItem("token", data.tokens.access);
          localStorage.setItem("refreshtoken", data.tokens.refresh);
          localStorage.setItem("loginType", "google");
          localStorage.setItem("username", data.user?.username || "googleuser");
          navigate("/home");
        } else {
          alert(data.error || "Google login failed");
        }
      })
      .catch(err => {
        console.error("Google auth error:", err);
        alert("Something went wrong");
      });
  }

  return (

<div className="loginout animate-swap " >

<div className="login-container">

  <h1 className="login-heading">Hey There, Log In!</h1>

  <div className="login-form">
    <TextField 
      id="outlined-required"
      label="Username"
      value={username}
      onChange={(e) => setusername(e.target.value)}
      placeholder="Enter your username"
      className="login-input"
    />

    <div style={{ position: "relative", width: "100%" }}>
  <TextField
    value={password}
    id="outlined-password-input"
    label="Password"
    onChange={(e) => setpassword(e.target.value)}
    type={showPassword ? "text" : "password"}
    autoComplete="current-password"
    className="login-input"
    fullWidth
  />
  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#555"
    }}
  >
    {showPassword ? <VisibilityOff /> : <Visibility />}
  </span>
</div>
    </div>
    <div className="login-links1">
      <button className="secondary-button" onClick={() => navigate("/forget")}>Forgot Password</button>
    </div>


    <button className="login-button" onClick={handlelogin}>Login</button>

    <div className="login-links">
      <p>Don't have an account?</p>
      <button className="secondary-button" onClick={() => navigate("/register")}>Sign Up</button>
    </div>

    <div class="separator">
    <span>or</span>
    </div>

    <div className="google-login-wrapper">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => alert("Google login failed")}
      />
    </div>

  </div>
  <div className="login-highlights">
  <div className="highlight-item">
    <span className="highlight-icon"></span>
    <span className="highlight-text">Craft resumes that beat the bots</span>
  </div>
  <div className="highlight-item">
    <span className="highlight-icon"></span>
    <span className="highlight-text">Build, edit, and optimize your ATS-friendly resume</span>
  </div>
  <div className="highlight-item">
    <span className="highlight-icon"></span>
    <span className="highlight-text">Your next opportunity starts with a smart resume</span>
  </div>
</div>

</div>
  );
}

export{Login}