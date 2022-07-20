import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../hooks/useAuth";

const RequireAuth = ({ children }) => {
  const auth = useAuth();

  return auth.user ? children : <Navigate to="/login" replace />;
};

RequireAuth.propTypes = {
  children: PropTypes.element,
};

export { RequireAuth };
