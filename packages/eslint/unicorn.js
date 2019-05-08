module.exports = {
  extends: ['plugin:unicorn/recommended', './rules/unicorn'].map(require.resolve)
}
