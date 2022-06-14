/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fs from "fs-extra";
import path from "path";
import commonJs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import sucrase from "@rollup/plugin-sucrase";
import typescript from "@rollup/plugin-typescript";

const ts_plugin = ({ isPublish = false, include } = {}) =>
  isPublish
    ? typescript({
        include,
        typescript: require("typescript")
      })
    : sucrase({
        transforms: ["typescript"]
      });

export const jsBundle = (
  config,
  {
    /**
     * klo isPublish true menggunakan typescript plugin dan klo false menggunaka sucrase
     */
    isPublish = false,
    type = "commonjs",
    jsonOptions = {},
    nodeResolveOptions = {
      preferBuiltins: true
    },
    externalDependencies = [],
    commonJsOptions = {},
    tsInclude = ["src/**"]
  } = {}
) => {
  const _externalDependencies = {
    ...(pkg.devDependencies || {}),
    ...(pkg.peerDependencies || {}),
    ...(pkg.optionalDependencies || {})
  };
  return {
    input: config.input,
    output: [
      {
        file:
          type === "module"
            ? config.output.replace(/\.js$/, ".js")
            : config.output.replace(/\.js$/, ".mjs"),
        format: "esm",
        paths: rewritePaths(),
        sourcemap: config.sourcemap,
        sourcemapPathTransform: rewriteSourcePaths(config),
        sourcemapExcludeSources: config.sourcemapExcludeSources
      },
      {
        file:
          type === "module"
            ? config.output.replace(/\.js$/, ".cjs")
            : config.output.replace(/\.js$/, ".js"),
        format: "cjs",
        paths: rewritePaths({}),
        sourcemap: config.sourcemap,
        sourcemapPathTransform: rewriteSourcePaths(config),
        sourcemapExcludeSources: config.sourcemapExcludeSources
      }
    ],
    external: [...externalDependencies, ...Object.keys(_externalDependencies)],
    plugins: [
      json(jsonOptions),
      nodeResolve(nodeResolveOptions),
      commonJs(commonJsOptions),
      ts_plugin({ isPublish, include: tsInclude })
    ]
  };
};

const pkgCache = Object.create(null);
const pkg = fs.readJsonSync(path.resolve("package.json"));

function readPackageJson(dir) {
  return pkgCache[dir] || (pkgCache[dir] = fs.readJsonSync(path.join(dir, "package.json")));
}
function rewritePaths() {
  const deps = pkg.dependencies || {};

  const locals = Object.entries(deps).filter(
    (entry) => entry[1].startsWith("link:") && (entry[1] = entry[1].slice(5))
  );
  const localPkgs = locals.reduce((pkgs, [name, version]) => {
    pkgs[name] = readPackageJson(path.resolve(version));
    return pkgs;
  }, Object.create(null));

  const resolveLocal = (modulePath) => {
    for (const [name] of locals) {
      if (modulePath === name || modulePath.startsWith(name + "/")) {
        const dep = localPkgs[name];
        return modulePath.replace(name, dep.name);
      }
    }
  };

  return (modulePath) => {
    let depId = resolveLocal(modulePath);
    if (!depId) {
      return modulePath;
    }
    return depId;
  };
}

function rewriteSourcePaths(config) {
  const outToIn = path.relative(path.dirname(config.output), path.dirname(config.input));
  return (file) => path.join(config.sourceRoot || "", path.relative(outToIn, file));
}

export default jsBundle;
