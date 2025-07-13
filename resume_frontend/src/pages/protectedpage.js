import React, { useEffect, useState } from "react";
import "../index.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { deepOrange } from "@mui/material/colors";


function Protectedpage() {
  const [profile, setProfile] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phn: "",
    dateofbirth: "",
  });
  const [saving, setSaving] = useState(false);
  
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("info");
  
  const showAlert = (msg, type = "info") => {
    setAlertMsg(msg);
    setAlertType(type);
    setAlertOpen(true);
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const API_URL = process.env.REACT_APP_BACKEND_URL;
    
    fetch(`${API_URL}/api/profile/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
        
      })
      .then((data) => {
        setProfile((prev) => ({ ...prev, ...data }));
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        showAlert("Failed to fetch profile", "error");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    setSaving(true);
    const token = localStorage.getItem("token");
    const API_URL = process.env.REACT_APP_BACKEND_URL;
    const updatedData = {
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      phn: profile.phn,
      dateofbirth: profile.dateofbirth,
    };
    
  
    fetch(`${API_URL}/api/profile/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || "Update failed");
        }
        showAlert("Profile updated successfully", "success");
      })
      .catch(async (err) => {
        console.error("Update failed:", err);
      
        if (err.response) {
          const errorData = await err.response.json();
      
          if (errorData.errors) {
            const messages = Object.entries(errorData.errors)
              .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
              .join("\n");
      
            showAlert("Update failed:\n" + messages, "error");
          } else if (errorData.message) {
            showAlert("Update failed: " + errorData.message, "error");
          } else {
            showAlert("Update failed: Unknown error", "error");
          }
        } else {
          showAlert("Update failed: Network error or server is down or Email Already in use", "error");
        }
      })
      .finally(() => setSaving(false));
  };
  
  const firstLetter = profile.username ? profile.username[0].toUpperCase() : "";

  return (
    <div className="profile-container">
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setAlertOpen(false)} severity={alertType} sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>
        <div className="welcome-message">Welcome, {profile.username}</div>
    <Stack direction="row" spacing={2} style={{ marginBottom: "20px" }}>
      <Avatar sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}>
        {firstLetter}
      </Avatar>
    </Stack>

    <div className="profile-field">
      <label>Username</label>
      <input type="text" value={profile.username || ""} disabled />
    </div>

    <div className="fields-row">
      <div className="profile-field">
        <label>First Name</label>
        <input name="first_name" value={profile.first_name || ""} onChange={handleChange} />
      </div>

      <div className="profile-field">
        <label>Last Name</label>
        <input name="last_name" value={profile.last_name || ""} onChange={handleChange} />
      </div>
    </div>

    <div className="fields-row">
      <div className="profile-field">
        <label>Email</label>
        <input name="email" value={profile.email || ""} onChange={handleChange} />
      </div>

      <div className="profile-field">
        <label>Phone</label>
        <input name="phn" value={profile.phn || ""} onChange={handleChange} />
      </div>
    </div>

    <div className="profile-field">
      <label>Date of Birth</label>
      <input name="dateofbirth" type="date" value={profile.dateofbirth || ""} onChange={handleChange} />
    </div>

    <button className="save-button" onClick={handleSave} disabled={saving}>
      {saving ? "Saving..." : "Save"}
    </button>

        </div>
  );
}

export { Protectedpage };

