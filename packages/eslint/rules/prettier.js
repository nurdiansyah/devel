const prettierConfig = require('eslint-config-prettier');

module.exports = Object.assign(prettierConfig, {
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 2
  }
});
