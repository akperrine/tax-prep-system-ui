import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./i18n";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
