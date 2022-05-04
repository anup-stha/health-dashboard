/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ["./src/components/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // or 'media' or 'class'
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
        fade: "fadeIn 200ms ease-in-out",
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
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
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
        primary: {
          25: "#fafef9",
          500: "#4cbb17",
          ...colors.green,
        },
        success: {
          25: "#f6fef9",
          50: "#ecfdf3",
          100: "#d1fadf",
          200: "#a6f4c5",
          300: "#6ce9a6",
          400: "#32d583",
          500: "#12b76a",
          600: "#039855",
          700: "#027a48",
          800: "#05603a",
          900: "#054f31",
        },

        secondary: {
          25: "#f5f8ff",
          50: "#eef4ff",
          100: "#e0eaff",
          200: "#c7d7fe",
          300: "#a4bcfd",
          400: "#8098f9",
          500: "#6172f3",
          600: "#444ce7",
          700: "#3538cd",
          800: "#2d31a6",
          900: "#2d3282",
        },
        error: {
          25: "#fffbfa",
          50: "#fef3f2",
          100: "#fee4e2",
          200: "#fecdca",
          300: "#fda29b",
          400: "#f97066",
          500: "#f04438",
          600: "#d92d20",
          700: "#b42318",
          800: "#912018",
          900: "#7a271a",
        },
        warning: {
          25: "#fffcf5",
          50: "#fffaeb",
          100: "#fef0c7",
          200: "#fedf89",
          300: "#fec84b",
          400: "#fdb022",
          500: "#f79009",
          600: "#dc6803",
          700: "#b54708",
          800: "#93370d",
          900: "#7a2e0e",
        },
        gray: {
          25: "#fcfcfc",
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d6d6d6",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#424242",
          800: "#292929",
          850: "#383838",
          900: "#141414",
        },

        green: {
          ...colors.green,
          500: "#4cbb17",
        },
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
          75: "#ffbdad",
          ...colors.red,
        },

        white: "#fff",
        black: "#000000",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
        "7xl": "4.5rem",
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
        primary: "Be Vietnam Pro",
        vietnam: "Be Vietnam Pro",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
