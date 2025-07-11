import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Register() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("info");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const navigate = useNavigate();

  const showAlert = (msg, type = "info") => {
    setAlertMsg(msg);
    setAlertType(type);
    setAlertOpen(true);
  };

  const adduser = () => {
    if (username && password && email) {
      setLoadingLogin(true); 
  
      fetch("https://resume-4hsf.onrender.com/api/register/", {
        method: "POST",
        body: JSON.stringify({ username, password, email }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.tokens && data.tokens.access && data.tokens.refresh) {
            localStorage.setItem("token", data.tokens.access);
            localStorage.setItem("refreshtoken", data.tokens.refresh);
            localStorage.setItem("username", username);
            localStorage.setItem("loginType", "manual");
            showAlert("Registration successful!", "success");
            setTimeout(() => navigate("/home"), 1000);
          } else {
            showAlert("Registration failed", "error");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          showAlert("Something went wrong", "error");
        })
        .finally(() => setLoadingLogin(false));
    } else {
      showAlert("Please fill all fields", "warning");
    }
  };
  
  return (
    <>
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>

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
            <button className="login-button" onClick={adduser} disabled={loadingLogin}>
            {loadingLogin ? "please wait" : "Register"}
          </button>
            <div className="login-links">
              <p>Already have an account?</p>
              <button
                className="secondary-button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>

        <div className="login-highlights">
          <div className="highlight-item">
            <span className="highlight-icon"></span>
            <span className="highlight-text">
              Craft resumes that beat the bots
            </span>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon"></span>
            <span className="highlight-text">
              Build, edit, and optimize your ATS-friendly resume
            </span>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon"></span>
            <span className="highlight-text">
              Your next opportunity starts with a smart resume
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export { Register };
