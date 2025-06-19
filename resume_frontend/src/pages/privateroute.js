import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (err) {
    return true;
  }
}

function RequireAuth({ children }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("token");
    const refresh = localStorage.getItem("refreshtoken");

    if (access && !isTokenExpired(access)) {
      setIsValid(true);
      setAuthChecked(true);
    }

    else if (refresh && !isTokenExpired(refresh)) {
      fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refresh })
      })
        .then(res => res.json())
        .then(data => {
          if (data.access) {
            localStorage.setItem("token", data.access);
            setIsValid(true);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshtoken");
            localStorage.removeItem("username");
          }
          setAuthChecked(true);
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshtoken");
          localStorage.removeItem("username");
          setAuthChecked(true);
        });
    }

    else {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("username");
      setAuthChecked(true);
    }
  }, []);

  if (!authChecked) return <h2>Checking authentication...</h2>;

  return isValid ? children : <Navigate to="/login" replace />;
}

export { RequireAuth };