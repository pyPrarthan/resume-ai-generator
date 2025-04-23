/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "ping-slow": "ping 5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "pulse-slow": "pulse 6s ease-in-out infinite",
        "neon-sweep": "neonSweep 3s ease-in-out forwards",
      },
      keyframes: {
        neonSweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
