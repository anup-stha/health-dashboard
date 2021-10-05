module.exports = {
  mode: "jit",

  purge: {
    enabled: true,
    content: ["./src/**/*.js", "./src/**/*.mdx", "./src/**/*.tsx"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
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
