module.exports = {
  extends: [
    // './rules/best-practices',
    './rules/variables',
    './rules/errors',
    './rules/node',
    './rules/style',
    './rules/jest'
  ].map(require.resolve),
  rules: {}
}
