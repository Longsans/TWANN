import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Header } from "../components/Header";

export const Home = () => {
  const auth = useAuth();

  const handleLogOut = () => {
    auth.signOut();
  };

  return (
    <Header>
      <a
        className="nav-link text-danger ms-2"
        role="button"
        onClick={handleLogOut}
      >
        Logout
      </a>
    </Header>
  );
};
