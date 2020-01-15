module.exports = {
  extends: ['./typescript'].map(require.resolve),
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    strict: 2
  }
};
