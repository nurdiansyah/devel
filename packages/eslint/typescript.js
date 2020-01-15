module.exports = {
  extends: ['./base', './rules/es6', './rules/strict', './rules/typescript', './rules/prettier'].map(
    require.resolve
  ),
  rules: {}
};
