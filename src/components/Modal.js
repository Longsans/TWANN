import React from "react";
import { motion } from "framer-motion";
import "./Modal.css";
import { Backdrop } from "./Backdrop";

export const Modal = ({ handleClose, header, text, buttons }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        className="Modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          transition: {
            type: "spring",
            bounce: 0.3,
          },
        }}
        exit={{
          scale: 0,
        }}
      >
        {header}
        <p className="mt-auto mb-auto fs-5">{text}</p>
        <div className="mt-auto d-flex justify-content-center w-100 mb-4 px-4">
          {buttons}
        </div>
      </motion.div>
    </Backdrop>
  );
};
