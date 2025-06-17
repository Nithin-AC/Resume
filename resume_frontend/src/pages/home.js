import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setusername(storedUser);
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("username");
    setusername("");
    navigate("/");
  }

  return (
    <>
      <h1>This is home page</h1>
      <h1>Welcome to the Home Page</h1>
      {username ? (
        <div>
          <h2>Hello, {username} 👋</h2>
          <button onClick={logout}>Logout</button>
          <button>reset password</button>
        </div>
      ) : (
        <h2>You are not logged in.</h2>
      )}

      {!username && (
        <div>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Sign up</button>
        </div>
      )}

      <button onClick={() => navigate("/protectedpage")}>Protected page</button>
    </>
  );
}

export { Home };
