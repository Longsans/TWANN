import React from "react";
import "./Login.css";
import { LoginForm } from "../components/LoginForm";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const auth = useAuth();

  const handleSubmitForm = async () => {
    if (!username || !password) {
      alert("You haven't filled all login info.");
      return;
    }

    try {
      await auth.signIn(username, password, rememberUser);
    } catch (errorMsg) {
      alert(errorMsg);
    }
    console.log(auth.user);
  };

  return auth.user ? (
    <Navigate to="/" replace />
  ) : (
    <div className="Login h-100 d-flex">
      <div className="d-flex flex-column login-area">
        <h4 className="fw-light text-danger">React web app</h4>

        <div className="flex-grow-1"></div>

        <div className="d-flex flex-column">
          <h1 className="fw-normal text-start mt-3 mb-4">Login</h1>
          <LoginForm
            username={username}
            password={password}
            rememberUser={rememberUser}
            onUsernameChange={(u) => setUsername(u)}
            onPasswordChange={(p) => setPassword(p)}
            onRememberUserChange={(r) => setRememberUser(r)}
            onSubmit={handleSubmitForm}
          ></LoginForm>
        </div>
        <div className="flex-grow-1"></div>
        <p className="fw-light">&copy; Created by Long Do</p>
      </div>
    </div>
  );
};
