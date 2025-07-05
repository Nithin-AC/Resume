// import React  from "react";
// import { Home } from "./pages/home";
// import {Login} from "./pages/login"
// import {Register} from "./pages/register"
// import { Routes, Route } from "react-router-dom";
// import { Protectedpage } from "./pages/protectedpage";
// import { RequireAuth } from "./pages/privateroute";
// function App1(){
//     return (
//         <Routes>
//             <Route path="/" element={<Home/>}/>
//             <Route path="/home" element={ <RequireAuth><Home /> </RequireAuth>} 
//             />
//             <Route path="/login" element={<Login/>}/>
//             <Route path="/register" element={<Register/>}/>
//             <Route path="/protectedpage" element={<RequireAuth> <Protectedpage/></RequireAuth>}/>
//         </Routes>
//     )
// }
// export {App1}

import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Protectedpage } from "./pages/protectedpage";
import { RequireAuth } from "./pages/privateroute";
import { Reset } from "./pages/reset";
import { Forget } from "./pages/forget";
import { Navbar } from "./pages/navbar";
import { Contactus } from "./pages/contactus";
import { Tips } from "./pages/tips";
import { Aboutus } from "./pages/aboutus";
import LoginModal from "./pages/loginmodal"; 
import { HomeAuthGuard } from "./pages/homeauth";
function App1() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className={showLoginModal ? "blurred" : ""}>
        <Navbar
          onProtectedClick={() => setShowLoginModal(true)}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomeAuthGuard><Home /></HomeAuthGuard>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/protectedpage" element={<RequireAuth><Protectedpage /></RequireAuth>} />
          <Route path="/reset" element={<RequireAuth><Reset/></RequireAuth>} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/aboutus" element={<Aboutus />} />
        </Routes>
      </div>
      {showLoginModal && (
        <LoginModal
          onCancel={() => setShowLoginModal(false)}
          onLogin={() => {
            setShowLoginModal(false);
            navigate("/login");
          }}
        />
      )}
    </>
  );
}
export { App1 };