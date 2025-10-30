/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        navy: "#0A1428",
        blue: "#1FB0FF",
        red: "#FF2E4C",
        white: "#F4F7FB",
      },
      boxShadow: {
        glowBlue: "0 10px 30px rgba(26,165,255,.25)",
        glowRed: "0 10px 30px rgba(255,77,109,.22)",
      },
    },
  },
  plugins: [],
};
