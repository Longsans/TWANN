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
        brand="This Web App Needs a Name"
        leftItems={
          <Link className="nav-link text-dark" to="/contact">
            Contact
          </Link>
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
      />
      <Outlet />
    </div>
  );
};
