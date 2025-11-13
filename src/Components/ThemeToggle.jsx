import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const availableThemes = [
  "light", // Light theme
  "retro", // 2nd theme
  "emerald", // Third theme
  "valentine", // Fourth theme
  "aqua", // Fifth theme
];

// dark
// valentine
// retro
// emerald

function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState("light");

  const cycleThemes = () => {
    // Get the index of the current theme and move to the next theme
    const currentIndex = availableThemes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    const nextTheme = availableThemes[nextIndex];

    // Change the theme
    setCurrentTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);

    // Store the new theme in localStorage
    localStorage.setItem("theme", nextTheme);
  };

  useEffect(() => {
    // On initial load, check if a theme is stored in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && availableThemes.includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      // If no theme is saved, set the default theme
      setCurrentTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  return (
    <div>
      <button
        onClick={cycleThemes}
        className="p-3 bg-neutral-500  text-white rounded-full hover:bg-blue-400 transition-all"
        title="Click to change theme"
      >
        {currentTheme === "light" || currentTheme === "emerald" ? (
          <FaSun className="text-yellow-500 text-xl hover:animate-spin" /> 
        ) : (
          <FaMoon className="text-gray-800 text-xl hover:animate-spin" /> 
        )}
      </button>
    </div>
  );
}

export default ThemeToggle;
