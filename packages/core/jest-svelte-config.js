const config = require("./jest-config");

module.exports = {
  ...config,
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
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "svelte"],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom",
    "@testing-library/jest-dom/extend-expect"
  ]
};
