import React from "react";
import { motion } from "framer-motion";
import "./TabIndicator.css";

export const TabIndicator = ({ x, width, backgroundColor }) => {
  return (
    <motion.div
      className="indicator"
      animate={{ x, width, backgroundColor }}
      transition={{ ease: "circOut" }}
    ></motion.div>
  );
};
