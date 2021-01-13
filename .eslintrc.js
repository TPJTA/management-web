module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "prettier/react",
  ],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "crlf" }],
  },
};
