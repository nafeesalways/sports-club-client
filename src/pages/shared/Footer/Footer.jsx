import React from "react";
import { GiWhistle } from "react-icons/gi";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal  text-black items-center p-4">
      <aside className="grid-flow-col items-center">
        <GiWhistle to='/' size={40} className="mr-2 text-yellow-300 cursor-pointer"></GiWhistle>
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
