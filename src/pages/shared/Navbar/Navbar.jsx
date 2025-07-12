import React from "react";

import { Link, NavLink } from "react-router";

const Navbar = () => {
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
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
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
       <img className="w-10 h-10" src="https://cdn-icons-png.flaticon.com/128/1599/1599287.png" alt="" />
        <a className="cursor-pointer font-bold text-3xl italic">CHAMPION</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Links}</ul>
      </div>
      <div className="navbar-end">
        <Link to='/signin' className="btn mr-2 border-black bg-yellow-300 text-black">
          Sign In
        </Link>
        <Link to='/signup' className="btn border-black bg-yellow-300 text-black">Sign Up</Link>
      </div>
    </div>
  );
};

export default Navbar;
