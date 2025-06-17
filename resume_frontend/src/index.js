import React from "react";
import { createRoot } from "react-dom/client"
// import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { App1 } from "./app1";
let root=createRoot(document.getElementById("root"))
root.render(
    <BrowserRouter>
    <App1 />
  </BrowserRouter>
)