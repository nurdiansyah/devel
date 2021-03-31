const fs = require("fs-extra");
const path = require("path");
const esbuild = require("rollup-plugin-esbuild");

const root = process.platform === "win32" ? path.resolve("/") : "/";
const external = id => !id.startsWith(".") && !id.startsWith(root);

const jsBundle = (config, { withUmd }) => ({
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
      file: config.output.replace(/\.js$/, ".cjs.js"),
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
  external,
  plugins: [esbuild()]
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
