import React from "react";

import "../components/styles/LandingPage2.css";
import { ReactComponent as Cornerleft } from "./svgCategories/cornerleft.svg";
import { ReactComponent as Cornerright } from "./svgCategories/cornerright.svg";
import { ReactComponent as Logo } from "./svgCategories/piggyBank-logo.svg";
// import { ReactComponent as Welcoming } from "./svgCategories/welcoming.svg";

import { useNavigate } from "react-router-dom";

export default function LandingPage2() {
  const navigate = useNavigate();

  const handelRegister = () => {
    navigate("/signup");
  };

  const handelLogin = () => {
    navigate("/login");
  };

  return (
    <div className="landingPage">
      <Cornerright className="cornerright" />

      <div className="piggyBank-log">
        <div className="logo-container">
          <Logo />
          <h1 className="logo-title">
            <span>Piggy</span>Bank
          </h1>
        </div>
        <div className="buttons">
          <button className="btn-landingPage" onClick={handelRegister}>
            REGISTER
          </button>

          <button className="btn-landingPage" onClick={handelLogin}>
            LOGIN
          </button>
        </div>
      </div>

      <Cornerleft className="cornerleft" />
    </div>
  );
}
