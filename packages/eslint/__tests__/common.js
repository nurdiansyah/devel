module.exports = {
  extends: [
    './rules/best-practices',
    './rules/errors',
    './rules/node',
    './rules/style',
    './rules/variables',
    './rules/jest',
    './rules/prettier'
  ].map(require.resolve),
  rules: {}
}
