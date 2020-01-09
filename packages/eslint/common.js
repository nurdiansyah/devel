module.exports = {
  extends: ['./base', './rules/prettier'].map(require.resolve),
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    strict: 0
  }
}
