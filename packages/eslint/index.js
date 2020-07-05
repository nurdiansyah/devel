module.exports = {
  extends: ["./rules/base", "./rules/typescript", "./rules/prettier"].map(
    require.resolve
  ),
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    strict: 2
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
