/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/30/22, 3:40 PM
 *
 *
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "google", "prettier", "next"],
  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@next/next/no-html-link-for-pages": "off",
    "react-hooks/exhaustive-deps": "off",
    "@next/next/no-img-element": "off",
    camelcase: "off",
  },
  settings: {
    react: {
      version: "latest",
    },
  },
};
