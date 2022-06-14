/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import commonJs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import ts from "@rollup/plugin-typescript";

/**
 *
 * @param tsOptions
 * @param commonJsOptions
 * @param nodeResolveOptions
 * @param jsonOptions
 * @return {{plugins: Plugin[]}}
 */
export const corePluginsNode = ({
  tsOptions,
  commonJsOptions,
  nodeResolveOptions,
  jsonOptions
} = {}) => ({
  plugins: [
    json(jsonOptions),
    nodeResolve(nodeResolveOptions),
    commonJs(commonJsOptions),
    ts({
      ...tsOptions
    })
  ]
});
