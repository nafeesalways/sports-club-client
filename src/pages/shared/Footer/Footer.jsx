import React from "react";

import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-yellow-300  text-black items-center p-4">
      <aside className="grid-flow-col items-center">
        <img className="w-10 h-10" src="https://cdn-icons-png.flaticon.com/128/1599/1599287.png" alt="" />
        <p className="font-semibold text-lg">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a
          href="https://facebook.com/Champion"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={25} className="hover:text-blue-500 transition" />
        </a>
        <a href="https://twitter.com/Champion" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={25} className="hover:text-sky-400 transition" />
        </a>
        <a href="https://youtube.com/Champion" target="_blank" rel="noopener noreferrer">
          <FaYoutube size={25} className="hover:text-red-500 transition" />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
