import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "./assets/logo.svg";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="bg-background w-full sticky top-0 let-0 z-20 text-base shadow-xl py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="logo">
          <Link to="/">
            <img className="logo" src={logo} width="100rem" alt="Logo" />
          </Link>
        </div>
        <div>
          {!user ? (
            <Link to="/login">
              <button className="bg-indigo-500 text-white text-xs font-bold py-2 px-4 rounded-full shadow-md w-28 ">
                <span>Login</span>
              </button>

            </Link>
          ) : (
            <div className="flex items-center gap-8">
              <a href="/auth/logout">
                <button className="bg-indigo-500 text-white text-xs font-bold py-2 px-4 rounded-full shadow-md w-28 ">
                  <span>Logout</span>
                </button>
              </a>
              {/* Profile icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>
      </nav>

            </a>
            <Link to="/profile">
              <img
                className="inline-block h-12 w-12 rounded-full items-center "
                src={user && user.profilePic}
                alt=""
              />
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};
export default Navbar;
