import "./App.css";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { HomeLayout } from "./pages/HomeLayout";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { useAuth } from "./hooks/useAuth";

function ProtectedOutlet() {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to="/login" replace />;
}

function RedirectToHomeIfAuthenticated({ children }) {
  const auth = useAuth();

  return !auth.user ? children : <Navigate to="/" replace />;
}

function RequireAuth({ children }) {
  const auth = useAuth();

  return auth.user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <div className="App Layout">
              <Outlet />
            </div>
          }
        >
          <Route
            path="login"
            element={
              <RedirectToHomeIfAuthenticated>
                <Login />
              </RedirectToHomeIfAuthenticated>
            }
          />
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomeLayout />
              </RequireAuth>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
