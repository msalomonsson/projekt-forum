import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.svg";

const navbar = () => {

  
  return (
    <div className="bg-background w-full sticky top-0 z-50 let-0 text-base flex justify-between items-center p-4 shadow-md ">
      <div className="logo">
        <Link to="/">
          <img className="logo" src={logo} width="100rem" alt="Logo" />
        </Link>
      </div>
      <div>
        <button className="bg-green-700 text-white py-2 px-4 rounded inline-flex items-center">
          <span>Signin</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default navbar;
