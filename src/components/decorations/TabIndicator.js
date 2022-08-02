import React from "react";
import { motion } from "framer-motion";
import "./TabIndicator.css";

export const TabIndicator = ({ width, backgroundColor }) => {
  return (
    <motion.div
      className="indicator"
      animate={{ width, backgroundColor }}
      transition={{ ease: "circOut" }}
      layoutId="underline"
    ></motion.div>
  );
};
