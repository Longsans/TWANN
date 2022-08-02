import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import App from "./App";
import { ProvideAuth } from "./components/ProvideAuth";
import { ProvideHistory } from "./components/ProvideHistory";
import { BrowserRouter as Router } from "react-router-dom";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ProvideAuth>
        <ProvideHistory>
          <App />
        </ProvideHistory>
      </ProvideAuth>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
