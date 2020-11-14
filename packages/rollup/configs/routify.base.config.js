import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sucrase from "@rollup/plugin-sucrase";
import replace from "@rollup/plugin-replace";
import svelte from "rollup-plugin-svelte-hot";
import Hmr from "rollup-plugin-hot";
import livereload from "rollup-plugin-livereload";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";
import svg from "rollup-plugin-svg";
import alias from "@rollup/plugin-alias";
import rimraf from "rimraf";
import { spassr } from "spassr";
import path from "path";

const isNollup = !!process.env.NOLLUP;

const tsPlugin = () => {
  return sucrase({
    transforms: ["typescript"]
  });
};

export const createRollupConfigs = (options = {}) => {
  const { production, serve, distDir } = options;
  const useDynamicImports =
    process.env.BUNDLING === "dynamic" || isNollup || !!production;
  rimraf.sync(distDir);
  if (serve && !isNollup) {
    spassr({
      serveSpa: true,
      serveSsr: !isNollup,
      silent: isNollup
    });
  }

  // Combine configs as needed
  return [
    !isNollup && baseConfig(options, { dynamicImports: false }),
    useDynamicImports && baseConfig(options, { dynamicImports: true }),
    !isNollup && serviceWorkerConfig(options)
  ].filter(Boolean);
};

function baseConfig(options, ctx) {
  const { dynamicImports } = ctx;
  const {
    staticDir,
    distDir,
    production,
    buildDir,
    svelteWrapper,
    rollupWrapper
  } = options;

  const outputConfig = !!dynamicImports
    ? { format: "esm", dir: path.join(distDir, buildDir) }
    : { format: "iife", file: path.join(distDir, buildDir, "bundle.js") };

  const _svelteConfig = {
    dev: !production, // runtime checks
    css: css => css.write(`bundle.css`),
    hot: isNollup
  };

  const svelteConfig = svelteWrapper(_svelteConfig, ctx);

  const transform = contents => {
    const scriptTag =
      typeof options.scriptTag != "undefined"
        ? options.scriptTag
        : `<script type="module" defer src="/${buildDir}/debox-app.js"></script>`;
    const bundleTag = `<script defer src="/${buildDir}/bundle.js"></script>`;
    return contents
      .toString()
      .replace("__SCRIPT__", dynamicImports ? scriptTag : bundleTag);
  };

  const _rollupConfig = {
    inlineDynamicImports: !dynamicImports,
    preserveEntrySignatures: false,
    input: "src/debox-app.ts",
    output: {
      name: "DeboxApp",
      sourcemap: true,
      ...outputConfig
    },
    plugins: [
      replace({
        "process.browser": "true",
        "process.env.NODE_ENV": JSON.stringify(production)
      }),
      copy({
        targets: [
          { src: [`${staticDir}/*`, "!*/(__index.html)"], dest: distDir },
          {
            src: [`${staticDir}/__index.html`],
            dest: distDir,
            rename: "__app.html",
            transform
          }
        ],
        copyOnce: true,
        flatten: false
      }),
      svg(),
      alias({
        entries: [{ find: "@", replacement: path.resolve("src") }]
      }),
      svelte(svelteConfig),

      // resolve matching modules from current working directory
      resolve({
        browser: true,
        dedupe: importee => !!importee.match(/svelte(\/|$)/)
      }),
      tsPlugin(),
      commonjs(),
      production && terser(), // minify
      !production && isNollup && Hmr({ inMemory: true, public: staticDir }), // refresh only updated code
      !production && !isNollup && livereload(distDir) // refresh entire window when code is updated
    ],
    watch: {
      clearScreen: false,
      buildDelay: 100
    }
  };
  return rollupWrapper(_rollupConfig, ctx) || _rollupConfig;
}

/**
 * Can be deleted if service workers aren't used
 */
function serviceWorkerConfig(config) {
  const { distDir, production, swWrapper } = config;
  const _rollupConfig = {
    input: `src/sw.ts`,
    output: {
      name: "service_worker",
      sourcemap: true,
      format: "iife",
      file: `${distDir}/sw.js`
    },
    plugins: [
      commonjs(),
      resolve({ browser: true }),
      production && terser(),
      replace({ "process.env.NODE_ENV": "'production'" })
    ]
  };
  const rollupConfig = swWrapper(_rollupConfig, {}) || _rollupConfig;

  return rollupConfig;
}
