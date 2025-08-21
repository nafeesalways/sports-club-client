import React from "react";
import { FaFacebook, FaTwitter, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-yellow-300 text-black px-6 py-10 my-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Logo and Copyright */}
        <div className="flex flex-col items-start gap-4">
          <a href="/">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1599/1599287.png"
              alt="Logo"
              className="w-12 h-12"
            />
          </a>
          <p className="font-semibold text-md sm:text-lg">
            © {new Date().getFullYear()} Champion Sports Club. <br />
            All rights reserved.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Contact Us</h3>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt /> 123 Sporty Street, Chattogram, Bangladesh
          </p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt /> +880 1234-567890
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope /> info@championclub.com
          </p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Follow Us</h3>
          <div className="flex gap-5 mt-2">
            <a
              href="https://facebook.com/Champion"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook size={28} className="hover:text-blue-700 transition" />
            </a>
            <a
              href="https://twitter.com/Champion"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter size={28} className="hover:text-sky-500 transition" />
            </a>
            <a
              href="https://youtube.com/Champion"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube size={28} className="hover:text-red-600 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t italic border-black mt-10 pt-4 text-center font-semibold text-sm">
        <p>Designed with ❤️ by Champion Sports Club Team</p>
      </div>
    </footer>
  );
};

export default Footer;
