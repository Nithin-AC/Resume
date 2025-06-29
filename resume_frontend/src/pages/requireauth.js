import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import LoginModal from "./loginmodal";

function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
}

function RequireAuth({ children }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("token");
    const refresh = localStorage.getItem("refreshtoken");

    if (access && !isTokenExpired(access)) {
      setIsValid(true);
      setAuthChecked(true);
    } else if (refresh && !isTokenExpired(refresh)) {
      fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh })
      })
        .then(res => res.json())
        .then(data => {
          if (data.access) {
            localStorage.setItem("token", data.access);
            setIsValid(true);
          } else {
            localStorage.clear();
            setShowLogin(true);
          }
          setAuthChecked(true);
        })
        .catch(() => {
          localStorage.clear();
          setShowLogin(true);
          setAuthChecked(true);
        });
    } else {
      localStorage.clear();
      setShowLogin(true);
      setAuthChecked(true);
    }
  }, []);

  if (!authChecked) return null;

  return (
    <>
      <div className={showLogin ? "blurred" : ""}>
        {isValid ? children : null}
      </div>
      {showLogin && (
        <LoginModal onSuccess={() => {
          setShowLogin(false);
          setIsValid(true);
        }} />
      )}
    </>
  );
}

export { RequireAuth };