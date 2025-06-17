import React  from "react";
import { Home } from "./pages/home";
import {Login} from "./pages/login"
import {Register} from "./pages/register"
import { Routes, Route } from "react-router-dom";
import { Protectedpage } from "./pages/protectedpage";
import { RequireAuth } from "./pages/privateroute";
function App1(){
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={ <RequireAuth><Home /> </RequireAuth>} 
            />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/protectedpage" element={<RequireAuth> <Protectedpage/></RequireAuth>}/>
        </Routes>
    )
}

export {App1}
