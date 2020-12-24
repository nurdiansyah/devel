const fs = require("fs");
const path = require("path");
const dts = require("rollup-plugin-dts").default;
const esbuild = require("rollup-plugin-esbuild");
const typescript = require("@rollup/plugin-typescript").default;
const babel = require("@rollup/plugin-babel").default;
const commonjs = require("@rollup/plugin-commonjs").default;
const resolve = require("@rollup/plugin-node-resolve").default;

const root = process.platform === "win32" ? path.resolve("/") : "/";
const external = id => !id.startsWith(".") && !id.startsWith(root);
const buildTypescript = ({ withTsc = false }) => {
  if (withTsc) {
    return typescript();
  } else {
    return esbuild({ target: "es2018" });
  }
};

// Every module in the "input" directory gets its own bundle.
const multiBundle = ({ input = "src", output = "libs", ...config } = {}) =>
  fs.readdirSync(input).reduce(
    (configs, file) =>
      configs.concat(
        bundle({
          input: path.join(input, file),
          output: path.join(output, file.replace(/\.tsx?$/, ".js")),
          ...config
        })
      ),
    []
  );

const getBundleConfig = ({
  input = "src/index.ts",
  output = "libs/index.js",
  sourcemap = true,
  sourcemapExcludeSources = true,
  sourceRoot = path.dirname(input)
} = {}) => ({
  input,
  output,
  sourcemap,
  sourcemapExcludeSources,
  sourceRoot
});

const bundle = ({ withTsc = false, ...config } = {}) => {
  config = getBundleConfig(config);
  return [
    jsBundle(config, { withTsc }),
    dtsBundle(config, "es") //
  ];
};

const jsBundle = (config, { withTsc }) => ({
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
      paths: rewritePaths({ cjs: true }),
      sourcemap: config.sourcemap,
      sourcemapPathTransform: rewriteSourcePaths(config),
      sourcemapExcludeSources: config.sourcemapExcludeSources
    }
  ],
  external,
  plugins: [buildTypescript({ withTsc })]
});

const dtsBundle = (config, format) => ({
  input: config.input,
  output: [
    {
      file: config.output.replace(
        /\.js$/,
        (format === "cjs" ? ".cjs" : "") + ".d.ts"
      ),
      format,
      paths: rewritePaths({
        cjs: format === "cjs"
      })
    }
  ],
  plugins: [dts()],
  external
});

// Used for the ".umd" bundle
const globals = {};

const umdBundle = (name, config) => {
  config = getBundleConfig(config);
  return {
    input: config.input,
    output: {
      file: config.output.replace(/\.js$/, ".umd.js"),
      format: "umd",
      name,
      globals,
      sourcemap: true
    },
    external: Object.keys(globals),
    plugins: [
      resolve({ extensions: [".js", ".ts", ".tsx"] }),
      commonjs({ include: /node_modules/ }),
      esbuild({ target: "es2018" }),
      babel({
        presets: [["@babel/env", { targets: "defaults" }]],
        babelHelpers: "bundled",
        plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
      })
    ]
  };
};

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

module.exports = {
  bundle,
  jsBundle,
  dtsBundle,
  umdBundle,
  multiBundle
};
