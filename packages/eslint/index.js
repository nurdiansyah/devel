module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["coverage", "libs", "node_modules", "build", "dist"],
  extends: ["./rules/prettier", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    strict: 2,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-explicit-any": 0
  },
  overrides: [
    {
      files: ["**/*.svelte"],
      rules: {
        "prettier/prettier": 0
      }
    }
  ]
};
