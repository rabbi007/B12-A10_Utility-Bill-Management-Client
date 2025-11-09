// tailwind.config.js
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        googleStyle: {
          primary: "#1a73e8",
          "primary-content": "#ffffff",
          secondary: "#34a853",
          accent: "#fbbc05",
          neutral: "#1f2937",
          "base-100": "#ffffff",
          info: "#60a5fa",
          success: "#34a853",
          warning: "#f59e0b",
          error: "#ea4335",
        },
      },
      "light",
      "dark",
    ],
  },
};
