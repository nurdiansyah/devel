#!/usr/bin/env node

import { rollup } from "rollup";
import loadConfigFile from "rollup/dist/loadConfigFile";
import path from "path";
import fs from "fs-extra";

(async () => {
  let configs;
  try {
    let rollupPath = path.resolve(process.cwd(), "rollup.config.js");
    if (!fs.pathExistsSync(rollupPath)) {
      rollupPath = path.resolve(process.cwd(), "rollup.config.mjs");
    }
    if (!fs.pathExistsSync(rollupPath)) {
      rollupPath = path.resolve(process.cwd(), "rollup.config.cjs");
    }
    if (!fs.pathExistsSync(rollupPath)) {
      throw new Error("rollup.config not found");
    }
    const { options, warnings } = await loadConfigFile(rollupPath);
    warnings.flush();
    configs = options;
  } catch (e) {
    console.error(e);
    throw e;
  }
  for (const config of configs) {
    await build(config);
  }
})();

/**
 *
 * @param outputOptions {import("rollup").OutputOptions | import("rollup").OutputOptions[]}
 * @param inputOptions
 * @return {Promise<void>}
 */
async function build({ output: outputOptions = [], ...inputOptions } = {}) {
  let bundle;
  try {
    // create bundle
    bundle = await rollup(inputOptions);
    if (Array.isArray(outputOptions)) {
      await Promise.all(outputOptions.map(bundle.write));
    } else {
      const result = await bundle.write(outputOptions);
      console.log(result);
    }
  } catch (e) {
    console.error(e);
  }
}
