module.exports = {
  globals: {},
  transform: {
    "^.+\\.[jt]sx?$": "@sucrase/jest-plugin"
  },
  testRegex: "(/(tests|__tests__)/.*.(test|spec)).(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coveragePathIgnorePatterns: ["((tests|__tests__)/.*.mock).(jsx?|tsx?)$"],
  bail: false
};
