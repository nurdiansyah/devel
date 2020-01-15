/* eslint-disable global-require */

const { declare } = require('@babel/helper-plugin-utils');

module.exports = declare((api, options) => ({
  presets: [['@babel/preset-typescript', options]]
}));
