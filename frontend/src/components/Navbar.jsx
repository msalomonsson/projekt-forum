import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.svg";

const navbar = () => {

  
  return (
      <nav className="bg-blue-700 sticky text-base">
        <div className="logo">
          <Link to="/">
            <img className="logo" src={logo} width="100rem" alt="Logo" />
          </Link>
        </div>
        <div className="login-btn">
          <button type="button" className="button">
            login
          </button>
        </div>
      </nav>
  );
};
export default navbar;
