import React from 'react';
import Logo from './Logo';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#e6f5ef] text-[#00303F] py-6 text-sm">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Left: Logo */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold text-blue-400"><Logo /></h2>
          <p className="text-xs mt-1">Modern & Responsive Websites</p>
        </div>

        {/* Middle: Links */}
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:text-white">Home</a></li>
          <li><a href="/about" className="hover:text-white">About</a></li>
          <li><a href="/contact" className="hover:text-white">Contact</a></li>
        </ul>

        {/* Right: Socials */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaFacebook /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaXTwitter /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaLinkedin /></a>
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center text-xs mt-4 border-t border-gray-600 pt-2">
        &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

