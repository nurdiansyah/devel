'use strict'

/* eslint-disable no-param-reassign */
/* eslint-disable global-require */

const {declare} = require('@babel/helper-plugin-utils')

module.exports = declare((api, options) => {
  options.development =
    typeof options.development === 'boolean'
      ? options.development
      : api.cache.using(() => process.env.NODE_ENV === 'development')
  const presets = [
    [require('@deboxsoft/babel-preset-devel'), options],
    [require('@babel/preset-react'), options]
  ]
  return {
    presets
  }
})
