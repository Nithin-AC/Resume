// // import React from "react";
// // import { NavLink, useNavigate } from "react-router-dom";
// // import "../index.css"
// // function Navbar({ username, loginType, logout }) {
// //   const navigate = useNavigate();

// //   return (
// //     <nav className="navbar">
// //       <NavLink to="/">Home</NavLink>
// //       <NavLink to="/aboutus">About</NavLink>
// //       <NavLink to="/tips">Tips to build resume</NavLink>
// //       <NavLink to="/contactus">Contact us</NavLink>
// //       <NavLink to="/protectedpage">Protectedpage</NavLink>
// //     </nav>
// //   );
// // }

// // export { Navbar };


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   Typography
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";

// const drawerWidth = 240;

// function Navbar() {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const username = localStorage.getItem("username");
//   const isGoogleLogin = localStorage.getItem("loginType") === "google";

//   function logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshtoken");
//     localStorage.removeItem("username");
//     navigate("/");
//     window.location.reload();
//   }

//   const navLinks = [
//     { label: "Home", path: "/" },
//     { label: "About us", path: "/aboutus" },
//     { label: "Tips to build resume", path: "/tips" },
//     { label: "Contact us", path: "/contactus" },
//     { label: "ProtectedPage", path: "/protectedpage" }
//   ];

//   return (
//     <>
//       <AppBar position="fixed" sx={{ backgroundColor: "#ffffff", boxShadow: 3 }}>
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between", color: "#0a192f" }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <IconButton edge="start" sx={{ color: "#0a192f" }} onClick={() => setOpen(true)}>
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0a192f" }}>Hironyx</Typography>
//           </Box>

//           {!username && (
//             <Box sx={{ display: "flex", gap: 1 }}>
//               <Button sx={{ color: "#0a192f" }} onClick={() => navigate("/login")}>Login</Button>
//               <Button sx={{ color: "#0a192f" }} onClick={() => navigate("/register")}>Sign Up</Button>
//             </Box>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         anchor="left"
//         open={open}
//         onClose={() => setOpen(false)}
//         sx={{
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             backgroundColor: "#ffffff",
//             color: "#0a192f",
//             display: "flex",
//             justifyContent: "space-between",
//             boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)"
//           }
//         }}
//       >
//         <Box sx={{ p: 2 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <h2>Hironyx</h2>
//             <IconButton onClick={() => setOpen(false)} sx={{ color: "#0a192f" }}>
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           <List>
//             {navLinks.map((item) => (
//               <ListItem
//                 button
//                 key={item.label}
//                 onClick={() => {
//                   setOpen(false);
//                   navigate(item.path);
//                 }}
//               >
//                 <ListItemText primary={item.label} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>

//         {username && (
//           <Box sx={{ p: 2 }}>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//               <Button variant="outlined" sx={{ color: "#0a192f", borderColor: "#0a192f" }} onClick={() => { logout(); setOpen(false); }}>
//                 Logout
//               </Button>
//               {!isGoogleLogin && (
//                 <Button variant="outlined" sx={{ color: "#0a192f", borderColor: "#0a192f" }} onClick={() => { navigate("/reset"); setOpen(false); }}>
//                   Reset Password
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         )}
//       </Drawer>
//       <Toolbar />
//     </>
//   );
// }

// export { Navbar };




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   Typography
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";

// const drawerWidth = 240;

// function Navbar({ onProtectedClick }) {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const username = localStorage.getItem("username");
//   const isGoogleLogin = localStorage.getItem("loginType") === "google";

//   function logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshtoken");
//     localStorage.removeItem("username");
//     navigate("/");
//     window.location.reload();
//   }

//   const navLinks = [
//     { label: "Home", path: "/" },
//     { label: "About us", path: "/aboutus" },
//     { label: "Tips to build resume", path: "/tips" },
//     { label: "Contact us", path: "/contactus" },
//   ];

//   const handleProtectedPageClick = () => {
//     setOpen(false);
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/protectedpage");
//     } else {
//       if (onProtectedClick) {
//         onProtectedClick(); 
//       }
//     }
//   };

//   return (
//     <>
//       <AppBar position="fixed" sx={{ backgroundColor: "#ffffff", boxShadow: 3 }}>
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between", color: "#0a192f" }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <IconButton edge="start" sx={{ color: "#0a192f" }} onClick={() => setOpen(true)}>
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0a192f" }}>Hironyx</Typography>
//           </Box>

//           {!username && (
//             <Box sx={{ display: "flex", gap: 1 }}>
//               <Button sx={{ color: "#0a192f" }} onClick={() => navigate("/login")}>Login</Button>
//               <Button sx={{ color: "#0a192f" }} onClick={() => navigate("/register")}>Sign Up</Button>
//             </Box>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         anchor="left"
//         open={open}
//         onClose={() => setOpen(false)}
//         sx={{
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             backgroundColor: "#ffffff",
//             color: "#0a192f",
//             display: "flex",
//             justifyContent: "space-between",
//             boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)"
//           }
//         }}
//       >
//         <Box sx={{ p: 2 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <h2>Hironyx</h2>
//             <IconButton onClick={() => setOpen(false)} sx={{ color: "#0a192f" }}>
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           <List>
//             {navLinks.map((item) => (
//               <ListItem
//                 button
//                 key={item.label}
//                 onClick={() => {
//                   setOpen(false);
//                   navigate(item.path);
//                 }}
//               >
//                 <ListItemText primary={item.label} />
//               </ListItem>
//             ))}
//             <ListItem button onClick={handleProtectedPageClick}>
//               <ListItemText primary="Profile" />
//             </ListItem>
//           </List>
//         </Box>

//         {username && (
//           <Box sx={{ p: 2 }}>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//               <Button variant="outlined" sx={{ color: "#0a192f", borderColor: "#0a192f" }} onClick={() => { logout(); setOpen(false); }}>
//                 Logout
//               </Button>
//               {!isGoogleLogin && (
//                 <Button variant="outlined" sx={{ color: "#0a192f", borderColor: "#0a192f" }} onClick={() => { navigate("/reset"); setOpen(false); }}>
//                   Reset Password
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         )}
//       </Drawer>
//       <Toolbar />
//     </>
//   );
// }

// export { Navbar };


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Avatar
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { deepOrange } from "@mui/material/colors";

const drawerWidth = 240;

function Navbar({ onProtectedClick }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const username = localStorage.getItem("username");
  const isGoogleLogin = localStorage.getItem("loginType") === "google";

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  }

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About us", path: "/aboutus" },
    { label: "Tips to build resume", path: "/tips" },
    { label: "Contact us", path: "/contactus" },
  ];

  const handleProtectedPageClick = () => {
    setOpen(false);
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/protectedpage");
    } else {
      if (onProtectedClick) onProtectedClick();
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#ffffff", boxShadow: 3 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", color: "#0a192f" }}>
          {/* Left: Logo and Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton edge="start" sx={{ color: "#0a192f" }} onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0a192f" }}>
              Hironyx
            </Typography>
          </Box>
                    <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 2 },
            }}
          >
            {!username ? (
              <>
                <Button
                  className="navbutton"
                  sx={{
                    color: "#0a192f",
                    fontSize: { xs: "0.7rem", sm: "1rem" },
                    minWidth: "auto",
                    padding: { xs: "4px 8px", sm: "6px 16px" }
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  className="navbutton"
                  sx={{
                    color: "#0a192f",
                    fontSize: { xs: "0.7rem", sm: "1rem" },
                    minWidth: "auto",
                    padding: { xs: "4px 8px", sm: "6px 16px" }
                  }}
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <IconButton onClick={() => navigate("/protectedpage")}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  {username[0]?.toUpperCase() || "U"}
                </Avatar>
              </IconButton>
            )}
          </Box>

        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#ffffff",
            color: "#0a192f",
            display: "flex",
            justifyContent: "space-between",
            boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)"
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Hironyx</h2>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "#0a192f" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navLinks.map((item) => (
              <ListItem
                button
                key={item.label}
                onClick={() => {
                  setOpen(false);
                  navigate(item.path);
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem button onClick={handleProtectedPageClick}>
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
        </Box>

        {username && (
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                variant="outlined"
                sx={{ color: "#0a192f", borderColor: "#0a192f" }}
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Logout
              </Button>
              {!isGoogleLogin && (
                <Button
                  variant="outlined"
                  sx={{ color: "#0a192f", borderColor: "#0a192f" }}
                  onClick={() => {
                    navigate("/reset");
                    setOpen(false);
                  }}
                >
                  Reset Password
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Drawer>

      <Toolbar />
    </>
  );
}

export { Navbar };
