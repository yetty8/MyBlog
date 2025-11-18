// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // enables dark mode via 'dark' class on <html>
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)", filter: "brightness(1) saturate(1)" },
          "50%": { transform: "translateY(-20px)", filter: "brightness(1.2) saturate(1.4) hue-rotate(40deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)", filter: "brightness(1) saturate(1)" },
          "50%": { transform: "translateY(-10px)", filter: "brightness(1.15) saturate(1.3) hue-rotate(40deg)" },
        },
        popup: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        popup: "popup 0.3s forwards",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
};
