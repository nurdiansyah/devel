module.exports = {
  extends: [
    './base',
    './rules/es6',
    './rules/strict',
    './rules/react',
    './rules/react-a11y',
    './rules/typescript',
    './rules/prettier',
    './rules/react-prettier',
    'eslint-config-prettier/@typescript-eslint'
  ].map(require.resolve),
  rules: {}
}
