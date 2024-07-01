module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    //eslint-config-prettier will disable all ESLint formatting rules that may conflict with Prettier's rules.
    // "@stylistic/js/indent": ["error", 2],
    // "@stylistic/js/linebreak-style": ["error", "unix"],
    // "@stylistic/js/quotes": ["error", "single"],
    // "@stylistic/js/semi": ["error", "never"],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": 0,
  },
};
