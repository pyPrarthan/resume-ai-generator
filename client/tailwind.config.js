/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        pulseSlower: "pulse 8s ease-in-out infinite",
        pulseSuperSlow: "pulse 15s ease-in-out infinite",
        flyIn: "flyIn 1s ease-out",
        bounceIn: "bounceIn 1.2s ease-out",
        floatSlow: "floatSlow 8s ease-in-out infinite",
        floatSlower: "floatSlower 12s ease-in-out infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
        flyIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "60%": { transform: "scale(1.05)", opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        floatSlow: {
          "0%": { transform: "translate(0px, 0px)" },
          "50%": { transform: "translate(30px, -20px)" },
          "100%": { transform: "translate(0px, 0px)" },
        },
        floatSlower: {
          "0%": { transform: "translate(0px, 0px)" },
          "50%": { transform: "translate(-20px, 30px)" },
          "100%": { transform: "translate(0px, 0px)" },
        },
      },
    },
  },
  plugins: [],
};
