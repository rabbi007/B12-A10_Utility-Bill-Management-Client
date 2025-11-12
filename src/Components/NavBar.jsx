import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";
import logo from "../assets/logo.svg";
import { toast } from "react-toastify";
import RefreshPage from "./RefreshPage";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const { currentUser, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const handleLogout = async () => {
    try {
      await signOutUser();
      closeMenu();
      toast.success("Successfully logged out.");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Failed to log out. Try again.");
    }
  };

  const baseLink =
    "px-3 py-2 rounded-md font-medium transition-all hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const activeClasses = "text-white bg-[#00A4EF] shadow-sm"; // blue active
  const idleClasses =
    "text-base-content/80 hover:text-base-content bg-transparent";
  const navItem = ({ isActive }) =>
    `${baseLink} ${isActive ? activeClasses : idleClasses}`;

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* color bar */}
      <div className="h-1.5 w-full grid grid-cols-4">
        <span className="bg-[#F25022]" />
        <span className="bg-[#7FBA00]" />
        <span className="bg-[#FFB900]" />
        <span className="bg-[#00A4EF]" />
      </div>

      {/* App bar */}
      <nav
        className="
    bg-transparent
    backdrop-blur-lg
    supports-backdrop-filter:bg-transparent
    border-b border-white/10
    shadow-sm
  "
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          {/* h-24 total height */}
          <div className="h-24 flex items-center justify-between">
            {/* Left: Brand logo only */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-3 ml-4"
                onClick={closeMenu}
                aria-label="Go to Home"
              >
                <img
                  src={logo}
                  alt="Utility Bill Management logo"
                  className="h-12 w-auto sm:h-14 md:h-16 lg:h-20"
                />
                {/* Visually-hidden brand text for a11y */}
                <p className="text-xl md:text-2xl font-extrabold tracking-tight">
                  Utility Bill Management
                </p>
              </Link>
            </div>

            <div className="flex justify-center items-center text-center gap-5 md:mr-5">
              <div className="hidden md:block">
                {/* Refresh Button */}
                <RefreshPage />
              </div>

              <div className="hidden md:block">
                {/* DaisyUI Themes */}
                <ThemeToggle />
              </div>
            </div>

            {/* Right: Desktop menu */}
            <div className="hidden md:flex items-center gap-2">
              <NavLink to="/" className={navItem} end>
                Home
              </NavLink>
              <NavLink to="/bills" className={navItem}>
                Bills
              </NavLink>

              {currentUser ? (
                <>
                  <NavLink to="/mybills" className={navItem}>
                    My Paid Bills
                  </NavLink>
                  <NavLink to="/profile" className={navItem}>
                    Profile
                  </NavLink>

                  <div className="flex items-center gap-3 pl-2 ml-1">
                    <img
                      src={currentUser.photoURL || "/default-avatar.png"}
                      alt="User avatar"
                      className="w-15 h-15 rounded-full border object-contain"
                    />
                    <span className="text-sm text-base-content/70 hidden lg:inline">
                      {currentUser.displayName || currentUser.email}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="
                        px-3 py-2 rounded-md font-medium
                        text-white bg-[#F25022] hover:bg-[#d6441f]
                        focus:outline-none focus:ring-2 focus:ring-offset-2
                      "
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={navItem}>
                    Login
                  </NavLink>
                  <NavLink to="/register" className={navItem}>
                    Register
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="
                md:hidden inline-flex items-center justify-center
                p-2 rounded-md
                text-base-content/80 hover:text-base-content
                focus:outline-none focus:ring-2 focus:ring-offset-2
              "
              aria-label="Toggle navigation menu"
              onClick={() => setOpen((s) => !s)}
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <div
          className={`
            md:hidden overflow-hidden transition-[max-height]
            ${open ? "max-h-96" : "max-h-0"}
          `}
        >
          <div className="pt-5 px-3 pb-3 space-y-2 bg-white/95 dark:bg-[#0b1220]/90">
            <NavLink to="/" className={navItem} end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/bills" className={navItem} onClick={closeMenu}>
              Bills
            </NavLink>

            {currentUser ? (
              <>
                <NavLink to="/mybills" className={navItem} onClick={closeMenu}>
                  My Paid Bills
                </NavLink>
                <NavLink to="/profile" className={navItem} onClick={closeMenu}>
                  Profile
                </NavLink>

                <div className="flex justify-center items-center text-center gap-3 pt-2">
                  {/* <img
                    src={currentUser.photoURL || "/default-avatar.png"}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full border object-contain"
                  /> */}
                  <div className="text-sm ">
                    <div className="font-semibold ">
                      {currentUser.displayName || "User"}
                    </div>
                    <div className="text-base-content/60">
                      {currentUser.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="
                    w-full mt-2 px-3 py-2 rounded-md font-medium
                    text-white bg-[#F25022] hover:bg-[#d6441f]
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                  "
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navItem} onClick={closeMenu}>
                  Login
                </NavLink>
                <NavLink to="/register" className={navItem} onClick={closeMenu}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
