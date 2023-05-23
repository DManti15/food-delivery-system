import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { IconProvider } from "./contexts/IconContext";

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <IconProvider>
        <App />
      </IconProvider>
    </AuthProvider>
  </BrowserRouter>
);
