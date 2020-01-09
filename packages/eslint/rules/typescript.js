module.exports = {
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 0,
    'no-undef': 0,
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    // 'import/prefer-default-export': 0,
    // 'import/no-default-export': 2,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': [0, { allowExpressions: true }],
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/class-name-casing': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/interface-name-prefix': 0,
  
    // eslint-config-prettier
    '@typescript-eslint/quotes': 0,
    '@typescript-eslint/brace-style': 'off',
    '@typescript-eslint/func-call-spacing': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-extra-parens': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/type-annotation-spacing': 'off'
  },
  overrides: [
    {
      files: ['**/*.{spec,test}.{js,jsx,ts,tsx}'],
      rules: {
        '@typescript-eslint/class-name-casing': 0
      }
    }
  ]
};
