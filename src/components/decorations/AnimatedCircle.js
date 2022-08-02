import React from "react";
import { motion } from "framer-motion";
import "./AnimatedCircle.scss";

export const AnimatedCircle = ({ x, y, width, height, translateY, delay }) => {
  return (
    <motion.div
      className="circle"
      initial={{
        x,
        y,
        scale: 0,
        width,
        height,
      }}
      animate={{
        scale: 1,
        translateY,
        transition: {
          type: "spring",
          bounce: 0.4,
          translateY: {
            repeat: Infinity,
            duration: 4,
          },
          delay,
        },
      }}
    />
  );
};
