import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Header } from "../components/Header";
import { Link, Outlet } from "react-router-dom";

export const HomeLayout = () => {
  const auth = useAuth();

  const handleLogOut = () => {
    auth.signOut();
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <Header
        brand={
          <p className="mb-0">
            This Web App{" "}
            <span style={{ color: "white", backgroundColor: "#0078D7" }}>
              Needs{" "}
            </span>
            a Name
          </p>
        }
        rightItems={
          <a
            className="nav-link text-danger"
            role="button"
            onClick={handleLogOut}
          >
            Logout
          </a>
        }
      >
        <Link className="nav-link text-dark me-4" to="/">
          Home
        </Link>
        <Link className="nav-link text-dark me-4" to="/contact">
          Contact
        </Link>
        <Link className="nav-link text-dark" to="#">
          About
        </Link>
      </Header>
      <Outlet />
    </div>
  );
};
