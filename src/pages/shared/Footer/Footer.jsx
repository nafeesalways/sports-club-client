import React from "react";
import { FaFacebook, FaTwitter, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="w-full mt-7 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1599/1599287.png"
                alt="Champion Logo"
                className="w-12 h-12"
              />
              <span className="font-black text-yellow-400 text-2xl italic">
                CHAMPION
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your premier destination for sports excellence and community. Building champions, one game at a time.
            </p>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Champion Sports Club. <br />
              All rights reserved.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-white mb-2">Contact Us</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 text-sm">
                <FaMapMarkerAlt className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 break-words">
                  123 Fitness Lane, Sector 7, Chattogram, Bangladesh
                </span>
              </div>
              <a 
                href="tel:+8801234567890"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FaPhoneAlt className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>+880 1234-567890</span>
              </a>
              <a 
                href="mailto:info@championclub.com"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-yellow-400 transition-colors break-all"
              >
                <FaEnvelope className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>info@championclub.com</span>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-white mb-2">Follow Us</h3>
            <p className="text-gray-400 text-sm mb-2">
              Stay connected with our community
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://facebook.com/Champion"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 hover:scale-110"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/Champion"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-sky-500 hover:border-sky-500 transition-all duration-300 hover:scale-110"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/Champion"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 hover:scale-110"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/Champion"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:border-pink-500 transition-all duration-300 hover:scale-110"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-gray-400 text-xs sm:text-sm">
              Designed with <span className="text-red-500">❤️</span> by Champion Sports Club Team
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm justify-center">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors whitespace-nowrap">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors whitespace-nowrap">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
