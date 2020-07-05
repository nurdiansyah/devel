module.exports = {
  overrides: [
    {
      files: ["**/*.svelte"],
      extends: ["./rules/svelte"].map(require.resolve),
      rules: {
        "prettier/prettier": 0
      }
    }
  ]
};
