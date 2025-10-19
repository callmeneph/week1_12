/* functions/.eslintrc.cjs */
module.exports = {
  root: true,
  env: { node: true, es2022: true },
  extends: ["eslint:recommended", "google"],
  parserOptions: { sourceType: "module" },
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "require-jsdoc": "off"
  }
};
