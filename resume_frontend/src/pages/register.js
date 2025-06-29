import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Register() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function adduser() {
    if (username && password && email) {
      fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        body: JSON.stringify({ username, password, email }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.tokens && data.tokens.access && data.tokens.refresh) {
            localStorage.setItem("token", data.tokens.access);
            localStorage.setItem("refreshtoken", data.tokens.refresh);
            localStorage.setItem("username", username);
            navigate("/home");
          } else {
            alert("Registration failed");
          }
        })
        .catch(err => {
          console.error("Error:", err);
          alert("Something went wrong");
        });
    } else {
      alert("Please fill all fields");
    }
  }

  return (
    <div className="loginout animate-swap">
      <div className="login-container">
        <h1 className="login-heading">Register to Beat the ATS Bots</h1>
        <div className="login-form">
          <TextField
            className="login-input"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            fullWidth
            margin="normal"
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
          <TextField
            className="login-input"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <button className="register-button" onClick={adduser}>Register</button>
          <div className="login-links">
            <p>Already have an account?</p>
            <button className="secondary-button" onClick={() => navigate("/login")}>Login</button>
          </div>
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

export { Register };