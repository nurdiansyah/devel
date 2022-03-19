/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs-extra");
const path = require("path");
const commonJs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve").nodeResolve;
const json = require("@rollup/plugin-json");
const sucrase = require("@rollup/plugin-sucrase");
const typescript = require("@rollup/plugin-typescript");

const ts_plugin = ({ isPublish = false, include } = {}) =>
  isPublish
    ? typescript({
        include,
        typescript: require("typescript")
      })
    : sucrase({
        transforms: ["typescript"]
      });

const jsBundle = (
  config,
  {
    /**
     * klo isPublish true menggunakan typescript plugin dan klo false menggunaka sucrase
     */
    isPublish = false,
    type = "commonjs",
    jsonOptions = {},
    nodeResolveOptions = {},
    commonJsOptions = {},
    tsInclude = ["src/**"]
  } = {}
) => ({
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
  external: [
    ...Object.keys(pkg?.peerDependencies || {}),
    ...Object.keys(pkg?.optionalDependencies || {})
  ],
  plugins: [
    json(jsonOptions),
    nodeResolve(nodeResolveOptions),
    commonJs(commonJsOptions),
    ts_plugin({ isPublish, include: tsInclude })
  ]
});

const pkgCache = Object.create(null);
const readPackageJson = (dir) =>
  pkgCache[dir] || (pkgCache[dir] = fs.readJsonSync(path.join(dir, "package.json")));

const pkg = fs.readJsonSync(path.resolve("package.json"));
const rewritePaths = () => {
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
};

const rewriteSourcePaths = (config) => {
  const outToIn = path.relative(path.dirname(config.output), path.dirname(config.input));
  return (file) => path.join(config.sourceRoot || "", path.relative(outToIn, file));
};

module.exports = jsBundle;
