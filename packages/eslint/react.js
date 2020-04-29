module.exports = {
  extends: ['./base', './typescript', './react', './prettier'].map(require.resolve)
};
