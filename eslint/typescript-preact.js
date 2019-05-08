module.exports = {
  settings: {
    react: {
      pragma: 'h'
    }
  },
  extends: [
    './base',
    './rules/es6',
    './rules/strict',
    './rules/preact',
    './rules/react-a11y',
    './rules/typescript',
    './rules/prettier',
    './rules/react-prettier',
    'eslint-config-prettier/@typescript-eslint'
  ].map(require.resolve),
  rules: {
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 0,
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    'react/jsx-filename-extension': 0,
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        argsIgnorePattern: 'h',
        ignoreRestSiblings: true
      }
    ]
  }
}
