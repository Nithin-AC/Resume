// import React, { useState, useEffect } from "react";
// import Box from '@mui/material/Box';
// import { Typewriter } from 'react-simple-typewriter';
// import{ FAQSection} from "./faq";
// import img1 from './img1.png';
// import { Chatbot } from "./chatbot.js";
// function Home() {
//   const [username, setusername] = useState("");
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [uploadedFileObj, setUploadedFileObj] = useState(null);
//   // const [score, setScore] = useState(null);
//   const [jobDescription, setJobDescription] = useState("");
//   const[analysis,setanalysis] = useState("");
//   const [chat, setchat] = useState(false);

//   const toggleChat = () => setchat(prev => !prev);
  
//   function chatopen() {
//     setchat(!chat);
//   }

//   useEffect(() => {
//     const storedUser = localStorage.getItem("username");
//     if (storedUser) {
//       setusername(storedUser);
//     }
//   }, []);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       setUploadedFile(file.name);
//       setUploadedFileObj(file);  
//       console.log("Dropped file:", file.name);
//     }
//   };
  
//   const handleDragOver = (e) => {
//     e.preventDefault(); 
//   };


//   function handlescore() {
//     if (!jobDescription || !uploadedFileObj) {
//       alert("Upload file and enter job description");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("resume", uploadedFileObj);
//     formData.append("description", jobDescription);
  
//     const token = localStorage.getItem("token");
  
//     fetch("http://127.0.0.1:8000/api/extract/", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
//       body: formData
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.analysis) {
//           console.log("Resume Analysis:", data.analysis);
//           setanalysis(data.analysis);
//           // const scoreMatch = data.analysis.match(/Match Score:\s*([0-9]+)\s*out of\s*100/i);
//           // if (scoreMatch && scoreMatch[1]) {
//           //   const extractedScore = parseInt(scoreMatch[1]);
//           //   setScore(extractedScore);  // this updates your `score` state
//           //   console.log("Extracted Match Score:", extractedScore);
//           // }
//           alert("Analysis complete!");

//         } else {
//           alert(data.error || "Something went wrong.");
//         }
//       })
//       .catch((err) => {
//         console.error("Error:", err);
//         alert("Server error");
//       });
//   }

//   return (
//     <>
//     <div className="outer">
//       <div className="left">
//       <Box sx={{ mt: 1, textAlign: "center", p: 2 }}>
//         {!username && <h2>You are not logged in.</h2>}
//         {username && <h2>Hello, {username} 👋</h2>}
//         <h1 style={{ fontSize: "30px", color: "#1976d2", fontWeight: 600 }}>
//           <Typewriter
//             words={["Hironyx's Resume Builder helps you get hired at top companies"]}
//             loop={5}
//             cursor
//             cursorStyle="|"
//             typeSpeed={60}
//             deleteSpeed={30}
//             delaySpeed={2000}
//           />
//         </h1>
//       </Box>
//       </div>

//       <div className="right">
//       <img alt="img" src="https://enhancv.com/_next/static/images/resume4-eb8e2bacc73eb143b714ffec42b44926.webp" />
//       </div>
//     </div>










//   <div className="down1">
//   <h2>Will Your Resume Pass the ATS?</h2>
//   <p>
//     Find out in seconds. Just upload your resume and get a detailed score with feedback to make sure your resume gets seen by recruiters — not filtered out by bots.
//   </p>
//   <div className="jobdescription">
//       <input   value={jobDescription}
//   onChange={(e) => setJobDescription(e.target.value)} placeholder="Enter your job Description"></input>
//   </div>
//   <div className="upload-box">
//   <label htmlFor="file-upload" className="upload-area"   onDragOver={handleDragOver}
//   onDrop={handleDrop}>
//     <p>Drag & drop your resume here<br />or click to upload</p>
//     <input
//       type="file"
//       id="file-upload"
//       accept=".pdf,.doc,.docx"
//       onChange={(e) => {
//         const file = e.target.files[0];
//         if (file) {
//           setUploadedFile(file.name);
//           setUploadedFileObj(file);  
//           console.log("Uploaded file:", file.name);
//         }
//       }}
//     />
//   </label>
//   {uploadedFile && (
//     <p style={{ marginTop: "10px", color: "#1a73e8", fontWeight: "500" }}>
//       📄 Uploaded: {uploadedFile}
//     </p>
//   )}

// {analysis && (
//   <div className="analysis-box">
//     <h3 className="login-heading" >Resume Analysis </h3>
//     <pre style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: "15px", borderRadius: "10px", color: "#333" }}>
//       {analysis}
//     </pre>
//   </div>
// )}


// <button onClick={handlescore} className="score-button">Get Score</button>
// </div>

// </div>














// <div className="down2">
//   <h2>Why ATS Scoring Matters</h2>
//   <p>
//     Most companies today use Applicant Tracking Systems (ATS) to filter resumes before a recruiter even sees them. If your resume isn't optimized for ATS, it may never reach human eyes.
//   </p>
//   <p>
//     Top companies like <strong>Google</strong>, <strong>Amazon</strong>, <strong>Microsoft</strong>, <strong>Facebook</strong>, and <strong>IBM</strong> rely heavily on ATS to streamline their hiring process.
//   </p>
//   <p className="ats-stat">
//      <strong>75%</strong> of resumes are rejected before a human ever sees them.
//   </p>
// </div>
// <div className="down4">
//   <h2>Our Features</h2>
//   <div className="feature-list">
//     <div className="feature-card">ATS Keyword Match</div>
//     <div className="feature-card">Section Validation</div>
//     <div className="feature-card">Resume Format Feedback</div>
//     <div className="feature-card">PDF/DOCX Support</div>
//     <div className="feature-card">Actionable Suggestions</div>
//   </div>
// </div>

// <div className="down41">
//   <h2>Resume Tailoring Based on the Job You’re Applying For</h2>
//   <p className="subtitle">
//     Quickly ensure your resume covers key skills by pasting the job ad below
//   </p>
  
//   <ul className="checklist">
//     <li>Skills and experience section analysis</li>
//     <li>Actionable checklist of what else to add to your resume</li>
//     <li>Instant comparison between your resume and the job posting</li>
//   </ul>

//   <div className="image-box">
//     <img alt="img" src="https://cdn.enhancv.com/images/1098/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcHJlZGVmaW5lZC1leGFtcGxlcy91MGdNWVpUc1JkdjVqUDU4U3lVd3QyZEExMlhPVkttcUk0YXg0ZHdUL2ltYWdlLnBuZw~~.png"/>
//     <img src={img1} alt="Resume Tailoring Demo" />
//   </div>
// </div>


// <div className="down5">
//   <h2>Why Choose Our ATS Resume Checker?</h2>

//   <div className="table-container">
//     <table className="comparison-table">
//       <thead>
//         <tr>
//           <th>Feature</th>
//           <th>ATS Resume Checker</th>
//           <th>Traditional Review</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>Speed</td>
//           <td>Instant Results</td>
//           <td>1–2 Days</td>
//         </tr>
//         <tr>
//           <td>Keyword Matching</td>
//           <td><span className="check-icon"></span></td>
//           <td><span className="cross-icon"></span></td>
//         </tr>
//         <tr>
//           <td>Formatting Check</td>
//           <td><span className="check-icon"></span></td>
//           <td>Partial</td>
//         </tr>
//         <tr>
//           <td>Bias-Free</td>
//           <td><span className="check-icon"></span></td>
//           <td><span className="cross-icon"></span></td>
//         </tr>
//         <tr>
//           <td>Cost</td>
//           <td>Free / Pro</td>
//           <td>$$$</td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
// </div>

// <div className="down6">
//     <FAQSection/>
// </div>

// {chat && (
//         <div className="chatbot-drawer open">
//           <div className="chatbot-header">
//             <h2 style={{ margin: 0 }}>Hironyx Assistant</h2>
//             <button className="chatbot-close" onClick={toggleChat}>&times;</button>
//           </div>
//           <div className="chatbot-separator"></div>
//           <Chatbot onClose={toggleChat} />
//         </div>
  
//       )}

//       <div
//         onClick={toggleChat}
//         className="chatbot-fixed"
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           zIndex: 999,
//           cursor: "pointer"
//         }}
//       >
//         <div className="chatbot-circle">
//           <svg
//             className="diamond-icon"
//             viewBox="0 0 100 100"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M50 5 
//               C60 20, 80 40, 95 50 
//               C80 60, 60 80, 50 95 
//               C40 80, 20 60, 5 50 
//               C20 40, 40 20, 50 5 Z"
//               fill="none"
//               stroke="#42a5f5"
//               strokeWidth="6"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//           <div className="stars">
//             <div className="star one"></div>
//             <div className="star two"></div>
//             <div className="star three"></div>
//             <div className="star four"></div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export { Home } ;



import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Typewriter } from "react-simple-typewriter";
import { FAQSection } from "./faq";
import img1 from "./img1.png";
import { Chatbot } from "./chatbot.js";
import { CircularProgress, Typography } from "@mui/material";
import img2 from "./img2.png";
function Home() {
  const [username, setusername] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileObj, setUploadedFileObj] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setanalysis] = useState("");
  const [chat, setchat] = useState(false);
  const [score, setScore] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("info");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (score !== null) {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        if (current > score) {
          clearInterval(interval);
        } else {
          setProgress(current);
        }
      }, 15); 
      return () => clearInterval(interval);
    }
  }, [score]);
  
  const showAlert = (msg, type = "info") => {
    setAlertMsg(msg);
    setAlertType(type);
    setAlertOpen(true);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setusername(storedUser);
    }
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file.name);
      setUploadedFileObj(file);
      console.log("Dropped file:", file.name);
      showAlert(`Uploaded file: ${file.name}`, "success");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  function handlescore() {
    if (!jobDescription || !uploadedFileObj) {
      showAlert("Upload file and enter job description", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("resume", uploadedFileObj);
    formData.append("description", jobDescription);

    const token = localStorage.getItem("token");

    fetch("https://resume-4hsf.onrender.com/api/extract/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.analysis) {
          console.log("Resume Analysis:", data.analysis);
          setanalysis(data.analysis);
          setScore(data.score);
          showAlert("Analysis complete!", "success");
        } else {
          showAlert(data.error || "Something went wrong", "error");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("Server error", "error");
      });
  }

  const toggleChat = () => setchat((prev) => !prev);

  return (
    <>
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>

      <div className="outer">
        <div className="left">
          <Box sx={{ mt: 1, textAlign: "center", p: 2 }}>
            {!username && <h2>You are not logged in.</h2>}
            {username && <h2>Hello, {username} 👋</h2>}
            <h1
              style={{ fontSize: "30px", color: "#1976d2", fontWeight: 600 }}
            >
              <Typewriter
                words={[
                  "Hironyx's Resume Builder helps you get hired at top companies"
                ]}
                loop={5}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={30}
                delaySpeed={2000}
              />
            </h1>
          </Box>
        </div>

        <div className="right">
          <img
            alt="img" src= {img2}
          />
        </div>
      </div>
      
      <div className="down1">
        <h2>Will Your Resume Pass the ATS?</h2>
        <p>
          Find out in seconds. Just upload your resume and get a detailed score
          with feedback to make sure your resume gets seen by recruiters — not
          filtered out by bots.
        </p>

        <div className="jobdescription">
          <input
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter your job Description"
          ></input>
        </div>

        <div className="upload-box">
          <label
            htmlFor="file-upload"
            className="upload-area"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <p>
              Drag & drop your resume here
              <br />
              or click to upload
            </p>
            <input
              type="file"
              id="file-upload"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setUploadedFile(file.name);
                  setUploadedFileObj(file);
                  console.log("Uploaded file:", file.name);
                  showAlert(`Uploaded file: ${file.name}`, "success");
                }
              }}
            />
          </label>
            <button onClick={handlescore} className="score-button">
              Get Score
            </button>
          {uploadedFile && (
            <p
              style={{
                marginTop: "10px",
                color: "#1a73e8",
                fontWeight: "500"
              }}
            >
              📄 Uploaded: {uploadedFile}
            </p>
          )}
          {/* {
            score && <h1>{score}</h1>
          } */}
        {score !== null && (
  <Box className="score-container">
    <CircularProgress
      variant="determinate"
      value={progress}
      size={120}
      thickness={5}
      className={`circle-progress ${score >= 75 ? "high" : score >= 50 ? "medium" : "low"}`}
    />
    <Box className="score-label">
      <Typography variant="h5" component="div" fontWeight="bold">
        {`${progress}`}
      </Typography>
      <Typography variant="body2" color="textSecondary">
         Score
      </Typography>
    </Box>
  </Box>
)}

          {analysis && (
            <div className="analysis-box">
              <h3 className="login-heading">Resume Analysis </h3>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  background: "#f4f4f4",
                  padding: "15px",
                  borderRadius: "10px",
                  color: "#333"
                }}
              >
                {analysis}
              </pre>
            </div>
          )}

        </div>
      </div>

      <div className="down2">
        <h2>Why ATS Scoring Matters</h2>
        <p>
          Most companies today use Applicant Tracking Systems (ATS) to filter
          resumes before a recruiter even sees them. If your resume isn't
          optimized for ATS, it may never reach human eyes.
        </p>
        <p>
          Top companies like <strong>Google</strong>, <strong>Amazon</strong>,{" "}
          <strong>Microsoft</strong>, <strong>Facebook</strong>, and{" "}
          <strong>IBM</strong> rely heavily on ATS to streamline their hiring
          process.
        </p>
        <p className="ats-stat">
          <strong>75%</strong> of resumes are rejected before a human ever sees
          them.
        </p>
      </div>

      <div className="down4">
        <h2>Our Features</h2>
        <div className="feature-list">
          <div className="feature-card">ATS Keyword Match</div>
          <div className="feature-card">Section Validation</div>
          <div className="feature-card">Resume Format Feedback</div>
          <div className="feature-card">PDF/DOCX Support</div>
          <div className="feature-card">Actionable Suggestions</div>
        </div>
      </div>

      <div className="down41">
        <h2>Resume Tailoring Based on the Job You’re Applying For</h2>
        <p className="subtitle">
          Quickly ensure your resume covers key skills by pasting the job ad
          below
        </p>

        <ul className="checklist">
          <li>Skills and experience section analysis</li>
          <li>Actionable checklist of what else to add to your resume</li>
          <li>
            Instant comparison between your resume and the job posting
          </li>
        </ul>

        <div className="image-box">
          <img
            alt="img"
            src="https://cdn.enhancv.com/images/1098/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcHJlZGVmaW5lZC1leGFtcGxlcy91MGdNWVpUc1JkdjVqUDU4U3lVd3QyZEExMlhPVkttcUk0YXg0ZHdUL2ltYWdlLnBuZw~~.png"
          />
          <img src={img1} alt="Resume Tailoring Demo" />
        </div>
      </div>

      <div className="down5">
        <h2>Why Choose Our ATS Resume Checker?</h2>

        <div className="table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>ATS Resume Checker</th>
                <th>Traditional Review</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Speed</td>
                <td>Instant Results</td>
                <td>1–2 Days</td>
              </tr>
              <tr>
                <td>Keyword Matching</td>
                <td>
                  <span className="check-icon"></span>
                </td>
                <td>
                  <span className="cross-icon"></span>
                </td>
              </tr>
              <tr>
                <td>Formatting Check</td>
                <td>
                  <span className="check-icon"></span>
                </td>
                <td>Partial</td>
              </tr>
              <tr>
                <td>Bias-Free</td>
                <td>
                  <span className="check-icon"></span>
                </td>
                <td>
                  <span className="cross-icon"></span>
                </td>
              </tr>
              <tr>
                <td>Cost</td>
                <td>Free / Pro</td>
                <td>$$$</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="down6">
        <FAQSection />
      </div>

      {chat && (
        <div className="chatbot-drawer open">
          <div className="chatbot-header">
            <h2 style={{ margin: 0 }}>Hironyx Assistant</h2>
            <button className="chatbot-close" onClick={toggleChat}>
              &times;
            </button>
          </div>
          <div className="chatbot-separator"></div>
          <Chatbot onClose={toggleChat} />
        </div>
      )}

      <div
        onClick={toggleChat}
        className="chatbot-fixed"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 999,
          cursor: "pointer"
        }}
      >
        <div className="chatbot-circle">
          <svg
            className="diamond-icon"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 5 
              C60 20, 80 40, 95 50 
              C80 60, 60 80, 50 95 
              C40 80, 20 60, 5 50 
              C20 40, 40 20, 50 5 Z"
              fill="none"
              stroke="#42a5f5"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="stars">
            <div className="star one"></div>
            <div className="star two"></div>
            <div className="star three"></div>
            <div className="star four"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Home };
