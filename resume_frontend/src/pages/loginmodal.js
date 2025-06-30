import React from "react";
import "../index.css";

function LoginModal({ onCancel, onLogin }) {
  return (
    <div className="login-modal-backdrop">
      <div className="login-modal-box1">
        <h3 className="login-heading" >Login Required</h3>
        <p className="forget-subtitle" >Oops! You need to log in to continue your journey with us</p>
        <button className="login-button" onClick={onLogin}>
          Go to Login
        </button>
        <button className="login-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
export default LoginModal;
