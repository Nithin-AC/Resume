import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
}

function HomeAuthGuard({ children }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const access = localStorage.getItem("token");
    const refresh = localStorage.getItem("refreshtoken");

    if (access && !isTokenExpired(access)) {
      setIsValid(true);
      setAuthChecked(true);
    } else if (refresh && !isTokenExpired(refresh)) {
      fetch("https://resume-4hsf.onrender.com/api/token/refresh/", {
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
            navigate("/"); 
          }
          setAuthChecked(true);
        })
        .catch(() => {
          localStorage.clear();
          navigate("/"); 
          setAuthChecked(true);
        });
    } else {
      localStorage.clear();
      navigate("/"); 
      setAuthChecked(true);
    }
  }, [navigate]);

  if (!authChecked) return null;

  return isValid ? children : null;
}

export { HomeAuthGuard };