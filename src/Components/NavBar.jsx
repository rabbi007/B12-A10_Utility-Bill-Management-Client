import React from "react";
import { Link } from "react-router-dom"; // For routing between pages

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">Utility Bill Management</Link>
        </div>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/bills" className="hover:text-gray-400">
            Bills
          </Link>
          <Link to="/login" className="hover:text-gray-400">
            Login
          </Link>
          <Link to="/register" className="hover:text-gray-400">
            Register
          </Link>
          <Link to="/mybills" className="hover:text-gray-400">
            My Pay Bills
          </Link>
          <div className="flex items-center">
            {/* User profile or avatar */}
            <div className="mr-4">User profile/avatar</div>
            <button className="hover:text-gray-400">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
