import React from "react";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { AnimatedCircle } from "../components/decorations/AnimatedCircle";
import "../site.scss";

export const Home = () => {
  const auth = useAuth();
  const mainContentDropIn = {
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
    <div className="d-flex flex-column flex-grow-1 position-relative overflow-hidden">
      <AnimatedCircle
        x="6vw"
        y="82vh"
        width="40px"
        height="40px"
        translateY={["-0.75rem", "0.75rem", "-0.75rem"]}
        delay={1.3}
      />
      <AnimatedCircle
        x="25vw"
        y="5vh"
        width="80px"
        height="80px"
        translateY={["1rem", "-1rem", "1rem"]}
        delay={1.45}
      />
      <AnimatedCircle
        x="60vw"
        y="65vh"
        width="150px"
        height="150px"
        translateY={["-1.5rem", "1.5rem", "-1.5rem"]}
        delay={1.6}
      />
      <AnimatedCircle
        x="90vw"
        y="10vh"
        width="300px"
        height="300px"
        translateY={["2rem", "-2rem", "2rem"]}
        delay={1.75}
      />
      <div className="h-25"></div>
      <motion.div
        className="d-flex flex-grow-1"
        variants={mainContentDropIn}
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
