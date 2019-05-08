module.exports = {
  extends: [
    './base',
    './rules/es6',
    './rules/imports',
    './rules/strict',
    './rules/react',
    './rules/react-a11y',
    './rules/prettier',
    './rules/react-prettier'
  ].map(require.resolve),
  rules: {}
}
