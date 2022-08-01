import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";
import "./HomeLayoutComponent.scss";
import variables from "../site.scss";

export const HomeLayout = () => {
  const auth = useAuth();
  const tabs = [
    {
      text: "Home",
      to: "/",
      textColor: variables.red,
    },
    {
      text: "Contact",
      to: "/contact",
      textColor: variables.blue,
    },
    {
      text: "About",
      to: "/about",
      textColor: variables.purple,
    },
  ];

  const handleLogOut = () => {
    auth.signOut();
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <Header
        brand={
          <p className="mb-0">
            This Web App <span className="title-highlight">Needs </span>a Name
          </p>
        }
        items={tabs}
        rightItems={
          <a
            className="nav-link text-danger"
            role="button"
            onClick={handleLogOut}
          >
            Logout
          </a>
        }
      ></Header>
      <Outlet />
    </div>
  );
};
