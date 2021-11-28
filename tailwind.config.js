/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "3xl": { min: "150em" },
      "2xl": { max: "150em" },
      xl: { max: "112.5em" },
      lg: { max: "75em" },
      md: { max: "56.25em" },
      sm: { max: "37.5em" },
      height: { raw: "(max-height: 700px)" },
    },
    extend: {
      animation: {
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
      keyframes: {
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      maxWidth: {
        "8xl": "100rem",
      },
      spacing: {
        zero: "0rem",
        tiny: "0.8rem",
        xs: "1.2rem",
        sm: "1.6rem",
        md: "1.8rem",
        base: "2rem",
        lg: "2.4rem",
        xl: "2.8rem",
        "2xl": "3.2rem",
        "2.5xl": "4rem",
        "3xl": "4.8rem",
        "4xl": "6rem",
        "5xl": "7.2rem",
        "6xl": "14.4rem",
        "7xl": "19.2rem",
        "8xl": "25.2rem",
      },
      colors: {
        ...colors,
        gray: { ...colors.gray, 850: "#383838" },

        green: colors.green,
        yellow: {
          75: "#fff0b3",
          500: "#ff8b00",
          400: "#ff991f",
          300: "#ffab00",
          200: "#ffc400",
          100: "#ffe380",
          50: "#fffae6",
        },
        red: {
          50: "#ffebe6",
          500: "#bf2600",
          400: "#de350b",
          300: "#ff5630",
          200: "#ff7452",
          100: "#ff8f73",
          75: "#ffbdad",
        },

        white: "#fff",
        black: "#000000",
      },
      boxShadow: {
        E100: "0px 0px 1px 0px rgba(9,30,66,0.31), 0px 1px 1px 0px rgba(9,30,66,0.25)",
        E200: "0px 0px 1px 0px rgba(9,30,66,0.31), 0px 3px 5px 0px rgba(9,30,66,0.2)",
        E300: "0px 0px 1px 0px rgba(9,30,66,0.31), 0px 8px 12px 0px rgba(9,30,66,0.15)",
        E400: "0px 0px 1px 0px rgba(9,30,66,0.31), 0px 10px 18px 0px rgba(9,30,66,0.15)",
        E500: "0px 0px 1px 0px rgba(9,30,66,1), 0px 18px 28px 0px rgba(9,30,66,0.05)",
        E600: "0px 0px 1px 0px rgba(9,30,66,0.4), 0px 18px 28px 0px rgba(9,30,66,0.25)",
        E900: "0px 0px 1px 0px rgba(9,30,66,0.31), 0px 18px 28px 0px rgba(9,30,66,0.35)",
      },
      borderRadius: {
        none: "0",
        xs: "0.125rem",
        sm: "0.25rem",
        default: "0.5rem",
      },
      fontFamily: {
        Nunito: "Raleway",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
