const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",

  purge: {
    enabled: true,
    content: ["./src/**/*.js", "./src/**/*.mdx", "./src/**/*.tsx"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...defaultTheme.colors,
      ...colors,
      gray: { ...colors.coolGray, 1000: "#0A0F19" },
      // red: colors.red,
      // blue: colors.blue,
      // yellow: colors.amber,
    },
    extend: {
      strokeWidth: {
        3: "3",
        4: "4",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
