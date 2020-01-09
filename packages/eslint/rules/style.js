module.exports = {
  rules: {
    // enforce line breaks after opening and before closing array brackets
    // https://eslint.org/docs/rules/array-bracket-newline
    // TODO: enable? semver-major
    'array-bracket-newline': ['off', 'consistent'], // object option alternative: { multiline: true, minItems: 3 }

    // enforce line breaks between array elements
    // https://eslint.org/docs/rules/array-element-newline
    // TODO: enable? semver-major
    'array-element-newline': ['off', {multiline: true, minItems: 3}],

    // enforce spacing inside array brackets
    'array-bracket-spacing': [2, 'never'],

    // enforce spacing inside single-line blocks
    // https://eslint.org/docs/rules/block-spacing
    'block-spacing': [2, 'always'],

    // enforce one true brace style
    'brace-style': [2, '1tbs', {allowSingleLine: true}],

    // require camel case names
    // TODO: semver-major (eslint 5): add ignoreDestructuring: false option
    camelcase: [2, {properties: 'never'}],

    // enforce or disallow capitalization of the first letter of a comment
    // https://eslint.org/docs/rules/capitalized-comments
    'capitalized-comments': [
      'off',
      'never',
      {
        line: {
          ignorePattern: '.*',
          ignoreInlineComments: true,
          ignoreConsecutiveComments: true
        },
        block: {
          ignorePattern: '.*',
          ignoreInlineComments: true,
          ignoreConsecutiveComments: true
        }
      }
    ],

    // require trailing commas in multiline object literals
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline'
      }
    ],

    // enforce spacing before and after comma
    'comma-spacing': [2, {before: false, after: true}],

    // enforce one true comma style
    'comma-style': [
      2,
      'last',
      {
        exceptions: {
          ArrayExpression: false,
          ArrayPattern: false,
          ArrowFunctionExpression: false,
          CallExpression: false,
          FunctionDeclaration: false,
          FunctionExpression: false,
          ImportDeclaration: false,
          ObjectExpression: false,
          ObjectPattern: false,
          VariableDeclaration: false,
          NewExpression: false
        }
      }
    ],

    // disallow padding inside computed properties
    'computed-property-spacing': [2, 'never'],

    // enforces consistent naming when capturing the current execution context
    'consistent-this': 0,

    // enforce newline at the end of file, with no multiple empty lines
    'eol-last': [2, 'always'],

    // enforce spacing between functions and their invocations
    // https://eslint.org/docs/rules/func-call-spacing
    'func-call-spacing': [2, 'never'],

    // requires function names to match the name of the variable or property to which they are
    // assigned
    // https://eslint.org/docs/rules/func-name-matching
    // TODO: semver-major (eslint 5): add considerPropertyDescriptor: true
    'func-name-matching': [
      'off',
      'always',
      {
        includeCommonJSModuleExports: false
      }
    ],

    // require function expressions to have a name
    // https://eslint.org/docs/rules/func-names
    'func-names': 1,

    // enforces use of function declarations or expressions
    // https://eslint.org/docs/rules/func-style
    // TODO: enable
    'func-style': ['off', 'expression'],

    // enforce consistent line breaks inside function parentheses
    // https://eslint.org/docs/rules/function-paren-newline
    'function-paren-newline': [2, 'consistent'],

    // Blacklist certain identifiers to prevent them being used
    // https://eslint.org/docs/rules/id-blacklist
    'id-blacklist': 0,

    // this option enforces minimum and maximum identifier lengths
    // (variable names, property names etc.)
    'id-length': 0,

    // require identifiers to match the provided regular expression
    'id-match': 0,

    // Enforce the location of arrow function bodies with implicit returns
    // https://eslint.org/docs/rules/implicit-arrow-linebreak
    'implicit-arrow-linebreak': [2, 'beside'],

    // this option sets a specific tab width for your code
    // https://eslint.org/docs/rules/indent
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        // MemberExpression: null,
        FunctionDeclaration: {
          parameters: 1,
          body: 1
        },
        FunctionExpression: {
          parameters: 1,
          body: 1
        },
        CallExpression: {
          arguments: 1
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
        ignoredNodes: [
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild'
        ],
        ignoreComments: false
      }
    ],

    // specify whether double or single quotes should be used in JSX attributes
    // https://eslint.org/docs/rules/jsx-quotes
    'jsx-quotes': ['off', 'prefer-double'],

    // enforces spacing between keys and values in object literal properties
    'key-spacing': [2, {beforeColon: false, afterColon: true}],

    // require a space before & after certain keywords
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true,
        overrides: {
          return: {after: true},
          throw: {after: true},
          case: {after: true}
        }
      }
    ],

    // enforce position of line comments
    // https://eslint.org/docs/rules/line-comment-position
    // TODO: enable?
    'line-comment-position': [
      'off',
      {
        position: 'above',
        ignorePattern: '',
        applyDefaultPatterns: true
      }
    ],

    // disallow mixed 'LF' and 'CRLF' as linebreaks
    // https://eslint.org/docs/rules/linebreak-style
    'linebreak-style': [2, 'unix'],

    // require or disallow an empty line between class members
    // https://eslint.org/docs/rules/lines-between-class-members
    'lines-between-class-members': [2, 'always', {exceptAfterSingleLine: true}],

    // enforces empty lines around comments
    'lines-around-comment': 0,

    // require or disallow newlines around directives
    // https://eslint.org/docs/rules/lines-around-directive
    'lines-around-directive': [
      2,
      {
        before: 'always',
        after: 'always'
      }
    ],

    // specify the maximum depth that blocks can be nested
    'max-depth': ['off', 4],

    // specify the maximum length of a line in your program
    // https://eslint.org/docs/rules/max-len
    'max-len': [
      2,
      100,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],

    // specify the max number of lines in a file
    // https://eslint.org/docs/rules/max-lines
    'max-lines': [
      'off',
      {
        max: 300,
        skipBlankLines: true,
        skipComments: true
      }
    ],

    // enforce a maximum function length
    // https://eslint.org/docs/rules/max-lines-per-function
    'max-lines-per-function': [
      'off',
      {
        max: 50,
        skipBlankLines: true,
        skipComments: true,
        IIFEs: true
      }
    ],

    // specify the maximum depth callbacks can be nested
    'max-nested-callbacks': 0,

    // limits the number of parameters that can be used in the function declaration.
    'max-params': ['off', 3],

    // specify the maximum number of statement allowed in a function
    'max-statements': ['off', 10],

    // restrict the number of statements per line
    // https://eslint.org/docs/rules/max-statements-per-line
    'max-statements-per-line': ['off', {max: 1}],

    // enforce a particular style for multiline comments
    // https://eslint.org/docs/rules/multiline-comment-style
    'multiline-comment-style': ['off', 'starred-block'],

    // require multiline ternary
    // https://eslint.org/docs/rules/multiline-ternary
    // TODO: enable?
    'multiline-ternary': ['off', 'never'],

    // require a capital letter for constructors
    'new-cap': [
      2,
      {
        newIsCap: true,
        newIsCapExceptions: [],
        capIsNew: false,
        capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List']
      }
    ],

    // disallow the omission of parentheses when invoking a constructor with no arguments
    // https://eslint.org/docs/rules/new-parens
    'new-parens': 2,

    // allow/disallow an empty newline after var statement
    'newline-after-var': 0,

    // https://eslint.org/docs/rules/newline-before-return
    'newline-before-return': 0,

    // enforces new line after each method call in the chain to make it
    // more readable and easy to maintain
    // https://eslint.org/docs/rules/newline-per-chained-call
    'newline-per-chained-call': [2, {ignoreChainWithDepth: 4}],

    // disallow use of the Array constructor
    'no-array-constructor': 2,

    // disallow use of bitwise operators
    // https://eslint.org/docs/rules/no-bitwise
    'no-bitwise': 2,

    // disallow use of the continue statement
    // https://eslint.org/docs/rules/no-continue
    'no-continue': 2,

    // disallow comments inline after code
    'no-inline-comments': 0,

    // disallow if as the only statement in an else block
    // https://eslint.org/docs/rules/no-lonely-if
    'no-lonely-if': 2,

    // disallow un-paren'd mixes of different operators
    // https://eslint.org/docs/rules/no-mixed-operators
    'no-mixed-operators': [
      2,
      {
        // the list of arthmetic groups disallows mixing `%` and `**`
        // with other arithmetic operators.
        groups: [
          ['%', '**'],
          ['%', '+'],
          ['%', '-'],
          ['%', '*'],
          ['%', '/'],
          ['**', '+'],
          ['**', '-'],
          ['**', '*'],
          ['**', '/'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof']
        ],
        allowSamePrecedence: false
      }
    ],

    // disallow mixed spaces and tabs for indentation
    'no-mixed-spaces-and-tabs': 2,

    // disallow use of chained assignment expressions
    // https://eslint.org/docs/rules/no-multi-assign
    'no-multi-assign': ['off'],

    // disallow multiple empty lines and only one newline at the end
    'no-multiple-empty-lines': [2, {max: 2, maxEOF: 0}],

    // disallow negated conditions
    // https://eslint.org/docs/rules/no-negated-condition
    'no-negated-condition': 0,

    // disallow nested ternary expressions
    'no-nested-ternary': 2,

    // disallow use of the Object constructor
    'no-new-object': 2,

    // disallow use of unary operators, ++ and --
    // https://eslint.org/docs/rules/no-plusplus
    'no-plusplus': 0,

    'no-return-assign': 0,

    // disallow certain syntax forms
    // https://eslint.org/docs/rules/no-restricted-syntax
    'no-restricted-syntax': [
      2,
      // {
      //   selector: 'ForInStatement',
      //   message:
      //     'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
      // },
      {
        selector: 'ForOfStatement',
        message:
          'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.'
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
      }
    ],

    // disallow space between function identifier and application
    'no-spaced-func': 2,

    // disallow tab characters entirely
    'no-tabs': 2,

    // disallow the use of ternary operators
    'no-ternary': 0,

    // disallow trailing whitespace at the end of lines
    'no-trailing-spaces': [
      2,
      {
        skipBlankLines: false,
        ignoreComments: false
      }
    ],

    // disallow dangling underscores in identifiers
    // https://eslint.org/docs/rules/no-underscore-dangle
    'no-underscore-dangle': 0,

    // disallow the use of Boolean literals in conditional expressions
    // also, prefer `a || b` over `a ? a : b`
    // https://eslint.org/docs/rules/no-unneeded-ternary
    'no-unneeded-ternary': [2, {defaultAssignment: false}],

    // disallow whitespace before properties
    // https://eslint.org/docs/rules/no-whitespace-before-property
    'no-whitespace-before-property': 2,

    // enforce the location of single-line statements
    // https://eslint.org/docs/rules/nonblock-statement-body-position
    'nonblock-statement-body-position': [2, 'beside', {overrides: {}}],

    // require padding inside curly braces
    'object-curly-spacing': [2, 'always'],

    // enforce line breaks between braces
    // https://eslint.org/docs/rules/object-curly-newline
    'object-curly-newline': [
      2,
      {
        ObjectExpression: {minProperties: 4, multiline: true, consistent: true},
        ObjectPattern: {minProperties: 4, multiline: true, consistent: true},
        ImportDeclaration: {minProperties: 4, multiline: true, consistent: true},
        ExportDeclaration: {minProperties: 4, multiline: true, consistent: true}
      }
    ],

    // enforce "same line" or "multiple line" on object properties.
    // https://eslint.org/docs/rules/object-property-newline
    'object-property-newline': [
      2,
      {
        allowAllPropertiesOnSameLine: true
      }
    ],

    // allow just one var statement per function
    'one-var': [2, 'never'],

    // require a newline around variable declaration
    // https://eslint.org/docs/rules/one-var-declaration-per-line
    'one-var-declaration-per-line': [2, 'always'],

    // require assignment operator shorthand where possible or prohibit it entirely
    // https://eslint.org/docs/rules/operator-assignment
    'operator-assignment': [2, 'always'],

    // Requires operator at the beginning of the line in multiline statements
    // https://eslint.org/docs/rules/operator-linebreak
    'operator-linebreak': [2, 'before', {overrides: {'=': 'none'}}],

    // disallow padding within blocks
    // TODO, semver-major: uncomment option
    'padded-blocks': [
      2,
      {
        blocks: 'never',
        classes: 'never',
        switches: 'never'
        // allowSingleLineBlocks: true,
      }
    ],

    // Require or disallow padding lines between statements
    // https://eslint.org/docs/rules/padding-line-between-statements
    'padding-line-between-statements': 0,

    // Prefer use of an object spread over Object.assign
    // https://eslint.org/docs/rules/prefer-object-spread
    // TODO: semver-major (eslint 5): enable
    'prefer-object-spread': 0,

    // require quotes around object literal property names
    // https://eslint.org/docs/rules/quote-props.html
    'quote-props': [2, 'as-needed', {keywords: false, unnecessary: true, numbers: false}],

    // specify whether double or single quotes should be used
    quotes: [2, 'single', {avoidEscape: true}],

    // do not require jsdoc
    // https://eslint.org/docs/rules/require-jsdoc
    'require-jsdoc': 0,

    // require or disallow use of semicolons instead of ASI
    semi: [2, 'never'],

    // enforce spacing before and after semicolons
    'semi-spacing': [2, {before: false, after: true}],

    // Enforce location of semicolons
    // https://eslint.org/docs/rules/semi-style
    'semi-style': [2, 'last'],

    // requires object keys to be sorted
    'sort-keys': ['off', 'asc', {caseSensitive: false, natural: true}],

    // sort variables within the same declaration block
    'sort-vars': 0,

    // require or disallow space before blocks
    'space-before-blocks': 2,

    // require or disallow space before function opening parenthesis
    // https://eslint.org/docs/rules/space-before-function-paren
    'space-before-function-paren': [
      2,
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],

    // require or disallow spaces inside parentheses
    'space-in-parens': [2, 'never'],

    // require spaces around operators
    'space-infix-ops': 2,

    // Require or disallow spaces before/after unary operators
    // https://eslint.org/docs/rules/space-unary-ops
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false,
        overrides: {}
      }
    ],

    // require or disallow a space immediately following the // or /* in a comment
    // https://eslint.org/docs/rules/spaced-comment
    'spaced-comment': [
      2,
      'always',
      {
        line: {
          exceptions: ['-', '+'],
          markers: ['=', '!'] // space here to support sprockets directives
        },
        block: {
          exceptions: ['-', '+'],
          markers: ['=', '!'], // space here to support sprockets directives
          balanced: true
        }
      }
    ],

    // Enforce spacing around colons of switch statements
    // https://eslint.org/docs/rules/switch-colon-spacing
    'switch-colon-spacing': [2, {after: true, before: false}],

    // Require or disallow spacing between template tags and their literals
    // https://eslint.org/docs/rules/template-tag-spacing
    'template-tag-spacing': [2, 'never'],

    // require or disallow the Unicode Byte Order Mark
    // https://eslint.org/docs/rules/unicode-bom
    'unicode-bom': [2, 'never'],

    // require regex literals to be wrapped in parentheses
    'wrap-regex': 0
  }
}
