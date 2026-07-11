import React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource/inter";
import "@fontsource/manrope";

import "./index.css";
import "./styles/globals.css";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);