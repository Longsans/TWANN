import React from "react";
import { Modal } from "./Modal";
import "./Modal.css";

export const SuccessModal = ({ handleClose, text }) => {
  return (
    <Modal
      handleClose={handleClose}
      header={<i className="bi bi-check-circle icon text-success mb-4" />}
      buttons={
        <button className="btn btn-success w-100" onClick={handleClose}>
          OK
        </button>
      }
      text={text}
    />
  );
};
