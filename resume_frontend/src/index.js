import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { App1 } from "./app1";

const root = createRoot(document.getElementById("root"));

root.render(
    <GoogleOAuthProvider clientId="440923686502-ntt2cvss5dcaobolfsetp2q3dkf2jmd9.apps.googleusercontent.com">
      <BrowserRouter>
        <App1 />
      </BrowserRouter>
    </GoogleOAuthProvider>
);