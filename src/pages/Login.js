import React from "react";
import "./Login.css";
import { LoginForm } from "../components/LoginForm";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const auth = useAuth();

  const handleSubmitForm = async ({ username, password, rememberUser }) => {
    try {
      await auth.signIn(username, password, rememberUser);
    } catch (errorMsg) {
      alert(errorMsg);
    }
  };

  return (
    <div className="Login h-100 d-flex">
      <div className="d-flex flex-column login-area">
        <h4 className="fw-light text-danger">React web app</h4>

        <div className="flex-grow-1"></div>

        <div className="d-flex flex-column">
          <h1 className="fw-normal text-start mt-3 mb-4">Login</h1>
          <LoginForm onSubmit={handleSubmitForm} />
        </div>
        <div className="flex-grow-1"></div>
        <p className="fw-light">&copy; Created by Long Do</p>
      </div>
    </div>
  );
};
