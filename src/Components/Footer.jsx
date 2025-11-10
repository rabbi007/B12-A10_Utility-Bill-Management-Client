import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className=" bg-gray-50 text-base-content/90"
      aria-label="Website footer"
    >

      {/* Google color underline */}
      <div className="h-1.5 w-full flex mt-10">
        <span className="flex-1 bg-[#4285f4]" />
        <span className="flex-1 bg-[#34a853]" />
        <span className="flex-1 bg-[#fbbc05]" />
        <span className="flex-1 bg-[#ea4335]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
        {/* Top: Brand + Short Description */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Brand */}
          <Link
            to="/"
            className="inline-flex items-center gap-3 group"
            aria-label="Go to Home"
          >
            <img
              src={logo}
              alt="Utility Bill Management logo"
              className="h-12 w-auto sm:h-14 md:h-16 lg:h-20"
            />
            <div>
              <p className="text-xl md:text-2xl font-extrabold tracking-tight">
                Utility Bill Management
              </p>
              <p className="text-xs text-base-content/60 mt-1">
                🧠 → MongoDB • Express.js • React • Node.js
              </p>
            </div>
          </Link>

          {/* Short Description */}
          <p className="md:max-w-xl text-sm leading-relaxed text-base-content/80">
            A secure and responsive platform to{" "}
            <span className="font-medium">view, filter, and manage</span> your
            monthly utility bills (Electricity, Gas, Water, Internet). Pay{" "}
            <span className="font-medium">current-month bills only</span>,
            download your payment report as PDF, and keep everything organized
            in one place.
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-base-300/60 dark:border-base-300/20" />

        {/* Useful Links */}
        <div
          className="text-center
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6
          "
        >
          <nav aria-label="Primary links">
            <h3 className="text-base font-semibold mb-3">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="link link-hover">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/bills" className="link link-hover">
                  Bills
                </Link>
              </li>
              <li>
                <Link to="/mybills" className="link link-hover">
                  My Pay Bills
                </Link>
              </li>
              <li>
                <Link to="/about" className="link link-hover">
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Account links">
            <h3 className="text-base font-semibold mb-3">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="link link-hover">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="link link-hover">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/profile" className="link link-hover">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/faq" className="link link-hover">
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Categories">
            <h3 className="text-base font-semibold mb-3">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/bills?category=Electricity"
                  className="link link-hover"
                >
                  Electricity
                </Link>
              </li>
              <li>
                <Link to="/bills?category=Gas" className="link link-hover">
                  Gas
                </Link>
              </li>
              <li>
                <Link to="/bills?category=Water" className="link link-hover">
                  Water
                </Link>
              </li>
              <li>
                <Link to="/bills?category=Internet" className="link link-hover">
                  Internet
                </Link>
              </li>
            </ul>
          </nav>

          <div aria-label="Contact & Theme" className="space-y-3">
            <h3 className="text-base font-semibold">Connect With Us</h3>

            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-3 mt-2 justify-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#1877F2] hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#1DA1F2] hover:scale-110 transition-transform"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#0077B5] hover:scale-110 transition-transform"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#E4405F] hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#24292E] dark:text-white hover:scale-110 transition-transform"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#FF0000] hover:scale-110 transition-transform"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
            </div>

            {/* Contact */}
            <p className="text-sm text-base-content/80 mt-4">
              📍 Dhaka, Bangladesh
              <br />
              ✉️{" "}
              <a href="mailto:rabbi@live.com" className="link link-primary">
                rabbi@live.com
              </a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-base-300/60 dark:border-base-300/20" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#F25022]" />
              <span className="w-2.5 h-2.5 rounded-sm bg-[#7FBA00]" />
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FFB900]" />
              <span className="w-2.5 h-2.5 rounded-sm bg-[#00A4EF]" />
            </span>
            <span className="text-base-content/60">
              Copyright © {year} - All rights reserved by KHANDAKER Horizon Ltd
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
