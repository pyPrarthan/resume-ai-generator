/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "gradient-move": "gradient-move 18s ease infinite",
        "floating-glow": "floating-glow 6s ease-in-out infinite",
        fadeInSlow: "fadeInSlow 1.5s ease-out forwards",
        float: "float 4s ease-in-out infinite",
        "bounce-soft": "bounce-soft 1s infinite",
        "shimmer-text": "shimmer-pulse 3s linear infinite",
        "sweep-top": "sweep-top 8s linear infinite",
        "sweep-bottom": "sweep-bottom 8s linear infinite",
      },
      keyframes: {
        "gradient-move": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "floating-glow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeInSlow: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "shimmer-pulse": {
          "0%": { backgroundPosition: "-200%" },
          "100%": { backgroundPosition: "200%" },
        },
        "sweep-top": {
          "0%": { left: "-100%", opacity: "0.8" },
          "50%": { left: "0%", opacity: "1" },
          "100%": { left: "100%", opacity: "0" },
        },
        "sweep-bottom": {
          "0%": { right: "-100%", opacity: "0.8" },
          "50%": { right: "0%", opacity: "1" },
          "100%": { right: "100%", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
