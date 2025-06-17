import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
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
    <>
      <h1>This is register page</h1>
      <input
        value={username}
        onChange={(e) => setusername(e.target.value)}
        placeholder="Enter the user name"
      />
      <input
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Enter the password"
        type="password"
      />
      <input
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder="Enter the email"
        type="email"
      />
      <br />
      <button onClick={adduser}>Register</button>
      <h3>Already have account?</h3>
      <button onClick={() => navigate("/login")}>Login</button>
    </>
  );
}

export { Register };

