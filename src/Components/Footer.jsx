import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6">
          <a href="/" className="hover:text-gray-400">
            Home
          </a>
          <a href="/bills" className="hover:text-gray-400">
            Bills
          </a>
          <a href="/about" className="hover:text-gray-400">
            About
          </a>
          <a href="/contact" className="hover:text-gray-400">
            Contact
          </a>
        </div>

        {/* Short Description */}
        <div className="mt-4 text-sm text-gray-400">
          <p>
            Utility Bill Management System - Simplifying the process of managing
            and paying utility bills.
          </p>
        </div>

        {/* Copyright Text */}
        <div className="mt-4 text-sm">
          <p>
            Utility Bill Management System &copy; 2025. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
