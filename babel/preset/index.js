/* eslint-disable global-require */

const {declare} = require('@babel/helper-plugin-utils')

const defaultTargets = {
  android: 30,
  chrome: 35,
  edge: 14,
  ie: 11,
  firefox: 52,
  safari: 8
}

function buildTargets({additionalTargets}) {
  return Object.assign({}, defaultTargets, additionalTargets)
}

module.exports = declare((api, options) => {
  // docs https://babeljs.io/docs/en/config-files#apicache
  api.assertVersion('^7.0.0')
  const {modules, targets = buildTargets(options), looseClasses = false} = options

  // TODO: remove this option entirely in the next major release.
  if (typeof modules !== 'undefined' && typeof modules !== 'boolean' && modules !== 'auto') {
    throw new TypeError(
      '@deboxsoft/babel-preset-devel only accepts `true`, `false`, or `"auto"` as the value of the "modules" option'
    )
  }
  const debug = typeof options.debug === 'boolean' ? options.debug : false
  typeof options.development === 'boolean'
    ? options.development
    : api.cache.using(() => process.env.NODE_ENV === 'development')
  const reflectiveBind = options.reflectiveBind || {enable: true}
  const macros = options.macros || false
  const presets = [
    [
      require('@babel/preset-env'),
      {
        debug,
        exclude: ['transform-async-to-generator', 'transform-template-literals', 'transform-regenerator'],
        modules: modules === false ? false : 'auto',
        targets
      }
    ]
  ]
  return {
    presets,
    plugins: [
      macros ? ['macros'] : null,
      reflectiveBind.enable ? [require('reflective-bind/babel'), {...reflectiveBind}] : null,
      looseClasses
        ? [
            require('@babel/plugin-transform-classes'),
            {
              loose: true
            }
          ]
        : null,
      [
        require('@babel/plugin-transform-template-literals'),
        {
          spec: true
        }
      ],
      require('@babel/plugin-transform-property-mutators'),
      require('@babel/plugin-transform-member-expression-literals'),
      require('@babel/plugin-transform-property-literals'),
      require('@babel/plugin-proposal-class-properties'),
      [
        require('@babel/plugin-proposal-object-rest-spread'),
        {
          useBuiltIns: true
        }
      ],
      require('@babel/plugin-proposal-optional-chaining'),
      require('@babel/plugin-proposal-export-default-from')
    ].filter(Boolean)
  }
})
