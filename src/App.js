import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Login } from "./pages/LoginComponent";
import { HomeLayout } from "./pages/HomeLayoutComponent";
import { Home } from "./pages/HomeComponent";
import { Contact } from "./pages/ContactComponent";
import { useAuth } from "./hooks/useAuth";

function ProtectedOutlet() {
  const auth = useAuth();

  return auth.accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}

function RedirectToHomeIfAuthenticated() {
  const auth = useAuth();

  return !auth.accessToken ? <Outlet /> : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <div className="App Layout d-flex">
              <Outlet />
            </div>
          }
        >
          <Route element={<RedirectToHomeIfAuthenticated />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route element={<ProtectedOutlet />}>
            <Route path="/" element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
