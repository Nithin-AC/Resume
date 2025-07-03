// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// function Reset() {
//   const [oldpassword, setoldpassword] = useState("");
//   const [newpassword, setnewpassword] = useState("");
//   const navigate = useNavigate();
//   function resetpassword() {
//     const token = localStorage.getItem("token");
  
//     if (!token) {
//       alert("You are not logged in.");
//       return;
//     }
  
//     fetch("http://127.0.0.1:8000/api/change-password/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         old_password: oldpassword,
//         new_password: newpassword,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.status === 200) {
//           alert("Password changed successfully");
//           setoldpassword("");
//           setnewpassword("");
//         } else {
//           const errorMsg =
//             data.old_password?.[0] || data.new_password?.[0] || "Something went wrong";
//           alert(errorMsg);
//         }
//       })
//       .catch((err) => {
//         console.error("Error:", err);
//         alert("Something went wrong");
//       });
//   }

//   return (
//     <div className="out">
//       <div className="forget1">
//         <h1 className="login-heading">Reset Password</h1>
//         <p className="forget-subtitle">Already know your old password? Go ahead and give it an upgrade.</p>
//         <input
//           type="password"
//           placeholder="Enter old password"
//           value={oldpassword}
//           onChange={(e) => setoldpassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Enter new password"
//           value={newpassword}
//           onChange={(e) => setnewpassword(e.target.value)}
//         />
//         <button className="login-button" onClick={resetpassword}>
//           Set new password
//         </button>
//         <button onClick={()=>navigate("/home")} className="login-button"  >Back to Home</button>
//       </div>
//     </div>
//   );
// }

// export { Reset };

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// function Reset() {
//   const [oldpassword, setoldpassword] = useState("");
//   const [newpassword, setnewpassword] = useState("");
//   const [showOld, setShowOld] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const navigate = useNavigate();

//   function resetpassword() {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You are not logged in.");
//       return;
//     }

//     fetch("http://127.0.0.1:8000/api/change-password/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         old_password: oldpassword,
//         new_password: newpassword,
//       }),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (res.status === 200) {
//           alert("Password changed successfully");
//           setoldpassword("");
//           setnewpassword("");
//         } else {
//           const errorMsg =
//             data.old_password?.[0] || data.new_password?.[0] || "Something went wrong";
//           alert(errorMsg);
//         }
//       })
//       .catch((err) => {
//         console.error("Error:", err);
//         alert("Something went wrong");
//       });
//   }

//   return (
//     <div className="out">
//       <div className="forget1">
//         <h1 className="login-heading">Reset Password</h1>
//         <p className="forget-subtitle">Already know your old password? Go ahead and give it an upgrade.</p>

//         <div style={{ position: "relative" }}>
//           <input
//             type={showOld ? "text" : "password"}
//             placeholder="Enter old password"
//             value={oldpassword}
//             onChange={(e) => setoldpassword(e.target.value)}
//           />
//           <span
//             onClick={() => setShowOld(!showOld)}
//             style={{
//               position: "absolute",
//               right: "10px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               cursor: "pointer"
//             }}
//           >
//             {showOld ? <VisibilityOff /> : <Visibility />}
//           </span>
//         </div>

//         <div style={{ position: "relative" }}>
//           <input
//             type={showNew ? "text" : "password"}
//             placeholder="Enter new password"
//             value={newpassword}
//             onChange={(e) => setnewpassword(e.target.value)}
//           />
//           <span
//             onClick={() => setShowNew(!showNew)}
//             style={{
//               position: "absolute",
//               right: "10px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               cursor: "pointer"
//             }}
//           >
//             {showNew ? <VisibilityOff /> : <Visibility />}
//           </span>
//         </div>

//         <button className="login-button" onClick={resetpassword}>
//           Set new password
//         </button>
//         <button onClick={() => navigate("/home")} className="login-button">
//           Back to Home
//         </button>
//       </div>
//     </div>
//   );
// }

// export { Reset };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Reset() {
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("info");
  const navigate = useNavigate();

  const showAlert = (msg, type = "info") => {
    setAlertMsg(msg);
    setAlertType(type);
    setAlertOpen(true);
  };

  function resetpassword() {
    const token = localStorage.getItem("token");
    if (!token) {
      showAlert("You are not logged in.", "error");
      return;
    }

    fetch("http://127.0.0.1:8000/api/change-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        old_password: oldpassword,
        new_password: newpassword,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 200) {
          showAlert("Password changed successfully", "success");
          setoldpassword("");
          setnewpassword("");
        } else {
          const errorMsg =
            data.old_password?.[0] || data.new_password?.[0] || "Something went wrong";
          showAlert(errorMsg, "error");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("Something went wrong", "error");
      });
  }

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

      <div className="out">
        <div className="forget1">
          <h1 className="login-heading">Reset Password</h1>
          <p className="forget-subtitle">
            Already know your old password? Go ahead and give it an upgrade.
          </p>

          <div style={{ position: "relative" }}>
            <input
              type={showOld ? "text" : "password"}
              placeholder="Enter old password"
              value={oldpassword}
              onChange={(e) => setoldpassword(e.target.value)}
            />
            <span
              onClick={() => setShowOld(!showOld)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showOld ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>

          <div style={{ position: "relative" }}>
            <input
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              value={newpassword}
              onChange={(e) => setnewpassword(e.target.value)}
            />
            <span
              onClick={() => setShowNew(!showNew)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showNew ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>

          <button className="login-button" onClick={resetpassword}>
            Set new password
          </button>
          <button onClick={() => navigate("/home")} className="login-button">
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
}

export { Reset };
