import React, { use, useEffect, useState } from "react";

import { Link, NavLink } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
   const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "light" ? "light" : "dark"
  );

    // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme);
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, [theme]);

 // Toggle theme function
  const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
 
  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch(() => toast.error("An error occurred"));
  };
  const Links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `block  font-bold mr-4 rounded transition-colors ${
            isActive
              ? "border-b-4 font-bold text-lg text-yellow-300"
              : "font-semibold text-lg"
          }`
        }
      >
        <a>Home</a>
      </NavLink>
      
      <NavLink
        to="/courts"
        className={({ isActive }) =>
          `block  font-bold mr-4 rounded transition-colors ${
            isActive
              ? "border-b-4 font-bold text-lg text-yellow-300"
              : "font-semibold text-lg"
          }`
        }
      >
        <a>Courts</a>
      </NavLink>
      <NavLink
        to="/blogs"
        className={({ isActive }) =>
          `block  font-bold mr-4 rounded transition-colors ${
            isActive
              ? "border-b-4 font-bold text-lg text-yellow-300"
              : "font-semibold text-lg"
          }`
        }
      >
        <a>Blogs</a>
      </NavLink>
    </>
  );
  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {Links}
          </ul>
        </div>
        <img
          className=" w-5 h-5 lg:w-10 lg:h-10"
          src="https://cdn-icons-png.flaticon.com/128/1599/1599287.png"
          alt=""
        />
        <a href="/" className="cursor-pointer font-bold sm:text-sm lg:text-3xl italic">
          CHAMPION
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Links}</ul>
      </div>
      <div className="navbar-end">
            <input
          type="checkbox"
          value="dark"
          className="lg:toggle lg:theme-controller mr-4 sm:mr-6 hidden"
          checked={theme === "dark"}
          onChange={handleThemeChange}
          aria-label="Toggle dark mode"
        />
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-yellow-400 ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/5vQ5cGV/default-user.png"
                  }
                  alt="Profile"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-56"
            >
              <li>
                <span className="font-semibold text-gray-700 cursor-default">
                  {user.displayName || user.email}
                </span>
              </li>
            {
              user && <>
                <li>
                <Link
                  to="/dashboard"
                  className="hover:text-yellow-500 font-medium"
                >
                  Dashboard
                </Link>
              </li>
              </>
            }
              <li>
                <button
                  onClick={handleLogOut}
                  className="text-left hover:text-red-500 font-medium"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              to="/signin"
              className="btn mr-2 border-black bg-yellow-300 text-black"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="btn border-black bg-yellow-300 text-black"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
