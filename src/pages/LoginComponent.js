import React, { useState } from "react";
import "./LoginComponent.css";
import { LoginForm } from "../components/LoginForm";
import { ErrorModal } from "../components/ErrorModal";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const auth = useAuth();
  const [modalText, setModalText] = useState(null);

  const handleSubmitForm = async ({ username, password, rememberUser }) => {
    try {
      await auth.signIn(username, password, rememberUser);
    } catch (errorMsg) {
      setModalText(errorMsg);
    }
  };

  const handleCloseModal = () => {
    setModalText(null);
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
      <AnimatePresence>
        {modalText && (
          <ErrorModal handleClose={handleCloseModal} text={modalText} />
        )}
      </AnimatePresence>
    </div>
  );
};
