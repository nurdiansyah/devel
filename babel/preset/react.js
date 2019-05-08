'use strict'

/* eslint-disable no-param-reassign */
/* eslint-disable global-require */

const {declare} = require('@babel/helper-plugin-utils')

module.exports = declare((api, options) => ({
  presets: [[require('@babel/preset-react'), options]]
}))
