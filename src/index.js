import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { ProvideAuth } from "./components/ProvideAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProvideAuth>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace={true} />} />
          </Route>
        </Routes>
      </Router>
    </ProvideAuth>
  </React.StrictMode>
);

reportWebVitals();
