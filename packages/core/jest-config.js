module.exports = {
  globals: {
    "svelte-jester": {
      // Let's avoid type checking during tests (performance boost).
      diagnostics: false
    }
  },
  transform: {
    "^.+\\.[jt]sx?$": "@sucrase/jest-plugin",
    "^.+\\.svelte$": ["svelte-jester", { preprocess: true, rootMode: "upward" }]
  },
  testRegex: "(/(tests|__tests__)/.*.(test|spec)).(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "svelte"],
  coveragePathIgnorePatterns: ["((tests|__tests__)/.*.mock).(jsx?|tsx?)$"],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom",
    "@testing-library/jest-dom/extend-expect"
  ],
  bail: false
};
