module.exports = {
  extends: ['./base', './rules/es6', './rules/imports', './rules/prettier'].map(require.resolve),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    strict: 2
  }
}
