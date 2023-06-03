/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        runOutOfTime: "runOutOfTime 4.5s linear forwards",
      },
      colors: {
        primary: "#44D0A7",
        subPrimary: "#A5F8E0",
        backgroundColor: "#7A7E87",
        secondary: "#C9CCCF",
        buttonOutLineRed: "#EB8882",
      },
      fontSize: {
        heading: "3rem",
        subHeading: "2.25rem",
        attention: "1.5rem",
        paragraph: "1rem",
      },
      keyframes: {
        runOutOfTime: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
    },
  },
  plugins: [],
};
