import React from "react";
import { Modal } from "./Modal";
import "./Modal.css";

export const ErrorModal = ({ handleClose, text }) => {
  return (
    <Modal
      handleClose={handleClose}
      header={<i className="bi bi-x-circle icon text-danger mb-4" />}
      buttons={
        <button className="btn btn-danger w-100" onClick={handleClose}>
          OK
        </button>
      }
      text={text}
    />
  );
};
