module.exports = {
  extends: ["airbnb-base", "plugin:node/recommended", "prettier"],
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    node: true,
  },
  rules: {
    "import/prefer-default=export": ["off"],
  },
};