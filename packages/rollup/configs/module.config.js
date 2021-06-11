const fs = require("fs-extra");
const path = require("path");
const commonJs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve").nodeResolve;
const json = require("@rollup/plugin-json");
const sucrase = require("@rollup/plugin-sucrase");

const root = process.platform === "win32" ? path.resolve("/") : "/";
const external = id => !id.startsWith(".") && !id.startsWith(root);

const jsBundle = (
  config,
  {
    withUmd,
    isModule = false,
    incDeps = [],
    jsonOptions = {},
    nodeResolveOptions = {},
    commonJsOptions = {}
  } = { isModule: true }
) => ({
  input: config.input,
  output: [
    {
      file: config.output,
      format: "esm",
      paths: rewritePaths(),
      sourcemap: config.sourcemap,
      sourcemapPathTransform: rewriteSourcePaths(config),
      sourcemapExcludeSources: config.sourcemapExcludeSources
    },
    {
      file: isModule
        ? config.output.replace(/\.js$/, ".cjs")
        : config.output.replace(/\.js$/, ".cjs.js"),
      format: "cjs",
      paths: rewritePaths({}),
      sourcemap: config.sourcemap,
      sourcemapPathTransform: rewriteSourcePaths(config),
      sourcemapExcludeSources: config.sourcemapExcludeSources
    },
    withUmd && {
      file: config.output.replace(/\.js$/, ".umd.js"),
      format: "umd",
      name: config.name,
      globals: {},
      paths: rewritePaths({}),
      sourcemap: config.sourcemap,
      sourcemapPathTransform: rewriteSourcePaths(config),
      sourcemapExcludeSources: config.sourcemapExcludeSources
    }
  ],
  external: id => external(id) && incDeps.findIndex(_ => _ === id) === -1,
  plugins: [
    json(jsonOptions),
    nodeResolve(nodeResolveOptions),
    commonJs(commonJsOptions),
    sucrase({ transforms: ["typescript"] })
  ]
});

// Used for the ".umd" bundle

const pkgCache = Object.create(null);
const readPackageJson = dir =>
  pkgCache[dir] ||
  (pkgCache[dir] = fs.readJsonSync(path.join(dir, "package.json")));

const pkg = fs.readJsonSync(path.resolve("package.json"));
const rewritePaths = (opts = {}) => {
  const deps = pkg.dependencies || {};

  const locals = Object.entries(deps).filter(
    entry => entry[1].startsWith("link:") && (entry[1] = entry[1].slice(5))
  );
  const localPkgs = locals.reduce((pkgs, [name, version]) => {
    pkgs[name] = readPackageJson(path.resolve(version));
    return pkgs;
  }, Object.create(null));

  const resolveLocal = modulePath => {
    for (const [name] of locals) {
      if (modulePath === name || modulePath.startsWith(name + "/")) {
        const dep = localPkgs[name];
        return modulePath.replace(name, dep.name);
      }
    }
  };

  return modulePath => {
    let depId = resolveLocal(modulePath);
    if (!depId) {
      return modulePath;
    }
    return depId;
  };
};

const rewriteSourcePaths = config => {
  const outToIn = path.relative(
    path.dirname(config.output),
    path.dirname(config.input)
  );
  return file =>
    path.join(config.sourceRoot || "", path.relative(outToIn, file));
};

module.exports = jsBundle;
