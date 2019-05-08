module.exports = {
  extends: [
    './base',
    './rules/es6',
    './rules/strict',
    './rules/typescript',
    './rules/prettier',
    'eslint-config-prettier/@typescript-eslint'
  ].map(require.resolve),
  rules: {}
}
