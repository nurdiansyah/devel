const commonJs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve").nodeResolve;
const ts = require("@wessberg/rollup-plugin-ts");
const json = require("@rollup/plugin-json");

const corePluginsNode = ({
  tsOptions,
  commonJsOptions,
  nodeResolveOptions,
  jsonOptions
} = {}) => {
  return {
    plugins: [
      json(jsonOptions),
      nodeResolve(nodeResolveOptions),
      commonJs(commonJsOptions),
      ts({
        ...tsOptions
      })
    ]
  };
};

module.exports = {
  corePluginsNode
};
