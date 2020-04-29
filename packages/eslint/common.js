module.exports = {
  extends: ['./base', './typescript', './prettier'].map(require.resolve),
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    strict: 0
  }
};
