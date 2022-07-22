import React from "react";
import { useAuth } from "../hooks/useAuth";
import "../site.css";

export const Home = () => {
  const auth = useAuth();

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="h-25"></div>
      <div className="d-flex flex-grow-1">
        <div className="d-flex flex-even justify-content-end">
          <img className="w-75" src="tyler1-hi.jpg" alt="hi-from-t1" />
        </div>
        <div className="d-flex flex-even">
          <div style={{ width: "8%" }}></div>
          <div
            style={{ width: "60%" }}
            className="d-flex flex-column align-items-start"
          >
            <h1 className="fw-bold">Hi, {auth.user.username}</h1>
            <p className="fs-5" style={{ textAlign: "justify" }}>
              Welcome to my website! As you can see on the top left corner, this
              web app is in desperate need for a name, since I don't have any
              good one. Also, there will be more features coming soon to replace
              this bland page, so stay tuned!
            </p>
          </div>
        </div>
      </div>
      <div className="h-25"></div>
    </div>
  );
};
