'use strict'

/* eslint-disable global-require */

const {declare} = require('@babel/helper-plugin-utils')

module.exports = declare(() => ({
  presets: ['@babel/preset-typescript']
}))
