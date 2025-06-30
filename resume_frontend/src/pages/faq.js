import React, { useState } from "react";
import "../index.css";

function FAQSection() {
  const faqs = [
    {
      question: "What is Hironyx?",
      answer: "Hironyx is an intelligent platform designed to enhance your resume and job applications using smart analysis and suggestions.",
    },
    {
      question: "Is Hironyx free to use?",
      answer: "Yes, all core features including resume analysis and tips are completely free for users.",
    },
    {
      question: "Can I use Hironyx on mobile?",
      answer: "Absolutely! Hironyx is fully responsive and optimized for both desktop and mobile use.",
    },
    {
      question: "How does resume analysis work?",
      answer: "We use AI models to parse your resume, compare it with your job description, and give precise, actionable feedback.",
    },
    {
      question: "Is my resume data secure?",
      answer: "Yes, we do not store your resume or personal data. Everything is processed securely and temporarily.",
    },
    {
      question: "Can I edit and re-upload my resume?",
      answer: "Definitely! You can refine and re-analyze your resume as many times as you like.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="login-heading">Frequently Asked Questions</h2>
      <div className="faq-list">
      {faqs.map((faq, index) => (
  <div key={index} className={`faq-item ${activeIndex === index ? "active" : ""}`}>
    <div className="faq-question" onClick={() => toggleFAQ(index)}>
      <span>{faq.question}</span>
      <span className="faq-toggle-icon">
  {activeIndex === index ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c4dcc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 15 12 9 18 15" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c4dcc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )}
</span>

    </div>
    <div className={`faq-answer ${activeIndex === index ? "show" : ""}`}>
      {faq.answer}
    </div>
  </div>
))}

      </div>
    </div>
  );
}

export { FAQSection };
