import React from "react";
import "../index.css";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Contactus() {
  return (
    <div className="contact-wrapper">
      <div className="contact-intro">
        <h1>We'd love to hear from you!</h1>
        <p>
          Whether you’re curious about features, a free trial, or even press—we’re ready to answer any and all questions.
        </p>
      </div>

      <div className="contact-card">
        <div className="contact-top">
          <div className="contact-logo">✦</div>
          <p className="contact-brand">Hironyx</p>
          <h2>Contact Us</h2>
        </div>
        <div className="contact-info">
          <p><PhoneIcon fontSize="small" /> +91-9492510418</p>
          <p><LanguageIcon fontSize="small" /> www.hironyx.in</p>
          <p><EmailIcon fontSize="small" /> acnithin1428@gmail.com</p>
          <p><LocationOnIcon fontSize="small" /> VIT AP University, Amaravati</p>
        </div>
      </div>

      <div className="contact-description">
        <h3>Why Contact Us?</h3>
        <p>
          Our team is dedicated to helping students, professionals, and recruiters streamline their resume-building journey. 
          From personalized assistance to feedback on your profile—we're here every step of the way.
        </p>
        <p>
          If you're experiencing issues, need technical support, or want to collaborate with us, don’t hesitate to drop a message.
        </p>
      </div>

      <p className="contact-footer">CONNECT WITH US!</p>
    </div>
  );
}

export { Contactus };
