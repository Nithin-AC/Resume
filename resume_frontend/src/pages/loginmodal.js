import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function LoginModal({ onSuccess }) {
  const navigate = useNavigate();

  return (
    <div className="login-modal-backdrop">
      <div className="login-box">
        <h3>Login Required</h3>
        <button
          className="login-button"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default LoginModal;