import React from "react";
import "../index.css";
import { FaBell } from "react-icons/fa";

function Tips() {
    const tips = [
        {
          title: "1. Use Standard Headings",
          points: [
            "Use headings like 'Work Experience', 'Education', and 'Skills'",
            "Avoid creative labels like 'What I've Done'",
            "Keep formatting simple and consistent"
          ],
        },
        {
          title: "2. Use Keywords from the Job Description",
          points: [
            "Match skills exactly as written in the job ad",
            "Use both acronyms and full forms (e.g., 'SEO' and 'Search Engine Optimization')",
            "Tailor your resume for each job",
            "Place keywords in both experience and skills sections"
          ],
        },
        {
          title: "3. Stick to Common Fonts",
          points: [
            "Use fonts like Arial, Calibri, or Times New Roman",
            "Avoid script or overly stylized fonts",
            "Keep font size between 10–12 pt"
          ],
        },
        {
          title: "4. Avoid Tables, Columns & Graphics",
          points: [
            "ATS may not parse content in tables/columns correctly",
            "Skip graphics, images, icons, and text boxes",
            "Use plain text and bullet points for clarity"
          ],
        },
        {
          title: "5. Use a Simple File Format",
          points: [
            "Submit resumes as .docx or .pdf unless otherwise stated",
            "Avoid rich-text or scanned formats",
            "Double-check compatibility on job portal before uploading"
          ],
        },
        {
          title: "6. Prioritize Work Experience",
          points: [
            "List roles in reverse chronological order",
            "Include company names, roles, dates, and achievements",
            "Use action verbs and quantify impact",
            "Keep descriptions concise and focused"
          ],
        },
        {
          title: "7. Keep Resume Length Reasonable",
          points: [
            "1 page for less than 5 years of experience",
            "2 pages for experienced professionals",
            "Avoid long paragraphs – use bullets instead"
          ],
        },
        {
          title: "8. Avoid Headers and Footers",
          points: [
            "ATS may not read content in headers/footers",
            "Put contact info in the main body",
            "Avoid resume title in header"
          ],
        },
        {
          title: "9. Highlight Technical & Soft Skills",
          points: [
            "Include both hard (e.g., Python, React) and soft skills (e.g., teamwork)",
            "Use a 'Skills' section for clarity",
            "Mention tools and platforms (e.g., GitHub, Figma)"
          ],
        },
        {
          title: "10. Test Your Resume with an ATS Scanner",
          points: [
            "Use free ATS resume checkers like Jobscan or ResumeWorded",
            "Fix parsing issues before applying",
          ],
        },
      ];
      
  return (
    <div className="tips-wrapper">
      <h1 className="login-heading">Tips to Build Resume</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }} className="para">
  Crafting a resume that passes through an Applicant Tracking System (ATS) is a critical step in today’s job market. Many companies use ATS software to automatically scan resumes before they ever reach a human. This means your resume must be formatted and written in a way that machines can understand. The tips below will help you optimize your resume for ATS compatibility, ensuring that your skills, experience, and accomplishments are accurately recognized and not lost due to formatting issues.
</div>


      <div className="curve-layout">
        <svg
          className="curve-line"
          viewBox="0 0 1000 2940"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 100
               C 150 250, 850 250, 950 400
               C 1050 550, 150 550, 50 700
               C -50 850, 850 850, 950 1000
               C 1050 1150, 150 1150, 50 1300
               C -50 1450, 850 1450, 950 1600
               C 1050 1750, 150 1750, 50 1900
               C -50 2050, 850 2050, 950 2200
               C 1050 2350, 150 2350, 50 2500
               C -50 2650, 850 2650, 950 2800
               C 1050 2950, 150 2950, 50 3100"
            stroke="#aaa"
            fill="transparent"
            strokeWidth="3"
          />
        </svg>

        <div className="bells">
          {tips.map((_, index) => (
            <div
              key={index}
              className="bell-swing"
              style={{
                top: `${index * 280 + 90}px`,
                left: index % 2 === 0 ? "10%" : "88%",
                transform: index % 2 !== 0 ? "translateX(-50%)" : "none",
              }}
            >
              <div className="thread-tips" />
              <FaBell className="bell-icon" />
            </div>
          ))}
        </div>

        <div className="cards">
          {tips.map((tip, index) => (
            <div
              key={index}
              className={`tip-card ${index % 2 === 0 ? "left" : "right"}`}
              style={{
                top: `${index * 280 + 120}px`,
              }}
            >
              <div className="card-content">
                <h3>{tip.title}</h3>
                <ul>
                  {tip.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Tips };
