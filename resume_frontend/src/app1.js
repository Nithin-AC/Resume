import React  from "react";
import { Home } from "./pages/home";
import {Login} from "./pages/login"
import {Register} from "./pages/register"
import { Routes, Route } from "react-router-dom";
import { Protectedpage } from "./pages/protectedpage";
import { RequireAuth } from "./pages/privateroute";
import { Reset } from "./pages/reset";
import { Forget } from "./pages/forget";
function App1(){
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={ <RequireAuth><Home /> </RequireAuth>} 
            />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/protectedpage" element={<RequireAuth> <Protectedpage/></RequireAuth>}/>
            <Route path="/reset" element={<RequireAuth><Reset/></RequireAuth>}/>
            <Route path="/forget" element={<Forget/>}/>
        </Routes>
    )
}

export {App1}