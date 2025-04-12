import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { FlashMessageProvider } from "./context/FlashMessageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FlashMessageProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </FlashMessageProvider>
  </React.StrictMode>
);
