import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme function
  const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        setIsMobileMenuOpen(false);
      })
      .catch(() => toast.error("An error occurred"));
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-4 py-2 rounded-lg font-semibold text-base transition-all duration-200 block ${
      isActive
        ? "text-yellow-400 bg-yellow-400/10 dark:bg-yellow-400/20"
        : "text-gray-600 dark:text-gray-500 hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  const Links = (
    <>
      <NavLink to="/" className={navLinkClass} onClick={closeMobileMenu}>
        Home
      </NavLink>
      <NavLink to="/courts" className={navLinkClass} onClick={closeMobileMenu}>
        Courts
      </NavLink>
      <NavLink to="/blogs" className={navLinkClass} onClick={closeMobileMenu}>
        Blogs
      </NavLink>
    </>
  );

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black backdrop-blur-md shadow-xl"
          : "bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 dark:from-black/95 dark:via-gray-900/95 dark:to-black/95 backdrop-blur-sm"
      } border-b border-yellow-400/20`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left Section: Mobile Menu + Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800 text-yellow-400 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img
                  className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                  src="https://cdn-icons-png.flaticon.com/128/1599/1599287.png"
                  alt="Champion Logo"
                />
              </div>
              <span className="font-black text-yellow-400 text-xl sm:text-2xl lg:text-3xl italic tracking-tight">
                CHAMPION
              </span>
            </Link>
          </div>

          {/* Center Section: Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {Links}
          </div>

          {/* Right Section: Theme Toggle + Auth */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle */}
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={handleThemeChange}
                aria-label="Toggle dark mode"
              />
              {/* Sun Icon */}
              <svg
                className="swap-on fill-yellow-400 w-6 h-6 sm:w-7 sm:h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              {/* Moon Icon */}
              <svg
                className="swap-off fill-gray-400 w-6 h-6 sm:w-7 sm:h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            {/* Auth Section */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-900 hover:ring-yellow-300 transition-all"
                >
                  <div className="w-9 sm:w-10 rounded-full">
                    <img
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co/5vQ5cGV/default-user.png"
                      }
                      alt={user.displayName || "User"}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 p-3 shadow-2xl bg-gray-800 dark:bg-black rounded-xl w-56 border border-yellow-400/30"
                >
                  <li className="px-3 py-2 mb-2 border-b border-yellow-400/30">
                    <div className="flex flex-col pointer-events-none">
                      <span className="font-bold text-yellow-400 text-sm truncate">
                        {user.displayName || "User"}
                      </span>
                      <span className="text-xs text-gray-400 truncate">
                        {user.email}
                      </span>
                    </div>
                  </li>
                  {user && (
                    <li>
                      <Link
                        to="/dashboard"
                        className="text-gray-200 hover:text-yellow-400 hover:bg-gray-700 rounded-lg font-medium"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                          />
                        </svg>
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="text-gray-200 hover:text-red-400 hover:bg-red-500/10 rounded-lg font-medium w-full justify-start"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/signin"
                  className="btn btn-sm bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-bold transition-all min-w-[80px]"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold transition-all min-w-[80px]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col py-4 space-y-2 border-t border-yellow-400/20">
            {Links}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 mt-4 border-t border-yellow-400/20 space-y-2 px-4">
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm w-full bg-red-500 hover:bg-red-600 text-white border-none font-bold"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/signin"
                    onClick={closeMobileMenu}
                    className="btn btn-sm flex-1 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-bold"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="btn btn-sm flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-none font-bold"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
