import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const auth = useAuth();

  return auth.user ? <div>Home</div> : <Navigate to="/login" replace={true} />;
};
