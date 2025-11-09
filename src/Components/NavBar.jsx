import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext/AuthContext"; // ← adjust if your path differs

const NavBar = () => {
  const { currentUser, signOutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const handleLogout = async () => {
    try {
      await signOutUser();
      closeMenu();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const baseLink =
    "px-3 py-2 rounded-md font-medium transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const activeClasses = "text-white bg-[#1a73e8]";
  const idleClasses =
    "text-base-content/80 hover:text-base-content bg-transparent";
  const navItem = ({ isActive }) =>
    `${baseLink} ${isActive ? activeClasses : idleClasses}`;

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Google color bar */}
      <div className="h-1.5 w-full flex">
        <span className="flex-1 bg-[#4285f4]" />
        <span className="flex-1 bg-[#34a853]" />
        <span className="flex-1 bg-[#fbbc05]" />
        <span className="flex-1 bg-[#ea4335]" />
      </div>

      {/* App bar */}
      <nav
        className="
          backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90
          dark:bg-[#0b1220]/80 border-b border-base-200
          shadow-sm
        "
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Left: Brand */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="
                  text-xl sm:text-2xl font-extrabold tracking-tight
                  bg-clip-text text-transparent
                  bg-gradient-to-r from-[#1a73e8] via-[#34a853] to-[#ea4335]
                "
                onClick={closeMenu}
              >
                Utility Bill Management
              </Link>
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
                    My Pay Bills
                  </NavLink>
                  <NavLink to="/profile" className={navItem}>
                    Profile
                  </NavLink>

                  <div className="flex items-center gap-3 pl-2 ml-1">
                    <img
                      src={
                        currentUser.photoURL ||
                        "https://i.ibb.co/4V9V8Gx/placeholder-avatar.png"
                      }
                      alt="User avatar"
                      className="w-9 h-9 rounded-full border object-cover"
                    />
                    <span className="text-sm text-base-content/70 hidden lg:inline">
                      {currentUser.displayName || currentUser.email}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="
                        px-3 py-2 rounded-md font-medium
                        text-white bg-[#ea4335] hover:bg-[#d93025]
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
                className="h-6 w-6"
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
          <div className="px-3 pb-3 space-y-2 bg-white/95 dark:bg-[#0b1220]/90">
            <NavLink to="/" className={navItem} end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/bills" className={navItem} onClick={closeMenu}>
              Bills
            </NavLink>

            {currentUser ? (
              <>
                <NavLink to="/mybills" className={navItem} onClick={closeMenu}>
                  My Pay Bills
                </NavLink>
                <NavLink to="/profile" className={navItem} onClick={closeMenu}>
                  Profile
                </NavLink>

                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={
                      currentUser.photoURL ||
                      "https://i.ibb.co/4V9V8Gx/placeholder-avatar.png"
                    }
                    alt="User avatar"
                    className="w-9 h-9 rounded-full border object-cover"
                  />
                  <div className="text-sm">
                    <div className="font-semibold">
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
                    text-white bg-[#ea4335] hover:bg-[#d93025]
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
