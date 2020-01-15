module.exports = {
  plugins: ['flowtype'],
  rules: {
    'flowtype/boolean-style': [2, 'boolean'],
    'flowtype/define-flow-type': 1,
    'flowtype/delimiter-dangle': 0,
    'flowtype/generic-spacing': 0,
    'flowtype/no-mixed': 0,
    'flowtype/no-types-missing-file-annotation': 2,
    'flowtype/no-weak-types': 0,
    'flowtype/require-parameter-type': 0,
    'flowtype/require-return-type': 0,
    'flowtype/require-valid-file-annotation': 0,
    'flowtype/semi': 0,
    'flowtype/space-after-type-colon': 0,
    'flowtype/space-before-generic-bracket': 0,
    'flowtype/space-before-type-colon': 0,
    'flowtype/type-id-match': 0,
    'flowtype/union-intersection-spacing': 0,
    'flowtype/use-flow-type': 1
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: false
    }
  }
};
