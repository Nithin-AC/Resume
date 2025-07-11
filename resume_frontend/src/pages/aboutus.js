import React from "react";
import "../index.css"; 

function Aboutus() {
  return (
    <div className="swing-wrapper">
      <div className="thread left-thread"></div>
      <div className="thread right-thread"></div>
      <div className="swing-ellipse">
        <h1>About Us</h1>
        <p>
          Welcome to <strong>Hironyx</strong> — a cutting-edge platform dedicated to empowering job seekers with tools
          to build, optimize, and tailor professional resumes that pass Applicant Tracking Systems (ATS) and attract top recruiters.
        </p>
        <p>
          In today’s highly competitive job market, a resume isn't just a piece of paper — it's your personal brand,
          your story, and your first impression. We realized that despite being qualified, many candidates face repeated rejections
          because their resumes fail to meet the standards of automated ATS systems used by 90% of Fortune 500 companies.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is simple yet powerful — <strong>to bridge the gap between talent and opportunity</strong>.
          We aim to democratize access to career growth by providing intuitive, intelligent, and accessible tools
          that help every user create resumes that are both ATS-friendly and recruiter-approved.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li><strong>ATS Resume Checker:</strong> Instantly analyze your resume’s compatibility with ATS algorithms.</li>
          <li><strong>Keyword Matcher:</strong> Match job descriptions against resumes for perfect tailoring.</li>
          <li><strong>Resume Builder:</strong> Create from scratch using professionally optimized templates.</li>
          <li><strong>PDF/DOCX Support:</strong> Upload and analyze instantly.</li>
          <li><strong>AI-Based Tips:</strong> Get actionable rewriting suggestions.</li>
        </ul>

        <h2>Why Choose Hironyx?</h2>
        <p>
          What makes us different is our <strong>focus on technology, personalization, and user-first design</strong>.
          Every feature is made with you in mind. Our sleek interface and machine learning insights give you a hiring advantage.
        </p>

        <h2>Our Team</h2>
        <p>
          A diverse group of developers, HR experts, and career coaches who believe in transparent hiring and career empowerment.
        </p>

        <h2>Looking Ahead</h2>
        <p>
          We are working on expanding with cover letter builders, interview prep, and job-matching tools.
        </p>

        <h2>Connect With Us</h2>
        <p>
          Have questions or feedback? <a href="/contactus">Contact us</a> and let’s build your future together.
        </p>

        <p style={{ fontWeight: "bold", marginTop: "2rem" }}>— The Hironyx Team</p>
      </div>
    </div>
  );
}

export { Aboutus };