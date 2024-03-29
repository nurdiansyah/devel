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
  let output = {
    sourcemap: config.sourcemap,
    sourcemapExcludeSources: config.sourcemapExcludeSources
  };
  if (typeof config.output === "string") {
    output.file = type === "module"
      ? config.output.replace(/\.js$/, ".js")
      : config.output.replace(/\.js$/, ".mjs");
    output.paths = rewritePaths();
    output.sourcemapPathTransform =  rewriteSourcePaths(config);
    output = [
      {
        ...output,
        format: "es"
      },
      {
        ...output,
        format: "cjs"
      }
    ]
  } else {
    output = {
      format: "es",
      ...output,
      ...(config.output || {})
    }
  }
  return {
    input: config.input,
    output,
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

/**
 * @param config
 * @param opts
 */
var module_config = (config, opts = {}) => {
  if (Array.isArray(config)) {
    const result = [];
    for (const configElement of config) {
      result.push(jsBundle(configElement, opts));
    }
    return result;
  }
  return jsBundle(config, opts);
};

module.exports = module_config;


