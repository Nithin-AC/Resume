import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  function handlelogin() {
    if (username && password) {
      fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(({ status, body }) => {
          if (status === 200 && body.access) {
            localStorage.setItem("token", body.access);
            localStorage.setItem("refreshtoken", body.refresh); 
            localStorage.setItem("username", username);
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

  return (
    <>
      <h1>This is login page</h1>
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
      <br />
      <button onClick={handlelogin}>Login</button>
      <h3>Don't have an account?</h3>
      <button onClick={() => navigate("/register")}>Sign up</button>
      <button onClick={()=>navigate("/forget")} >Forget password</button>
      <button>continue with google</button>
    </>

  );
}

export { Login };