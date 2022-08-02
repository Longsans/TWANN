import React from "react";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import "../site.scss";

export const Home = () => {
  const auth = useAuth();
  const dropIn = {
    initial: {
      opacity: 0,
      translateY: "50px",
    },
    visible: {
      opacity: 1,
      translateY: "0px",
      transition: {
        ease: "easeOut",
        duration: 0.6,
        delay: 0.5,
      },
    },
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="h-25"></div>
      <motion.div
        className="d-flex flex-grow-1"
        variants={dropIn}
        initial="initial"
        animate="visible"
      >
        <div className="d-flex flex-even justify-content-end">
          <img className="w-75" src="tyler1-hi.jpg" alt="hi-from-t1" />
        </div>
        <div className="d-flex flex-even">
          <div className="w-8"></div>
          <div className="d-flex w-60 flex-column align-items-start">
            <h1 className="fw-bold">Hi, {auth?.user?.username}</h1>
            <p className="fs-5 text-justify">
              Welcome to my website! As you can see on the top left corner, this
              web app is in desperate need for a name, since I don't have any
              good one. Also, there will be more features coming soon to replace
              this bland page, so stay tuned!
            </p>
          </div>
        </div>
      </motion.div>
      <div className="h-25"></div>
    </div>
  );
};
