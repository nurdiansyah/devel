import path from "path";
import fs from "fs";
import syncFolders from "sync-folders";

/**
 * @typedef {Object} ReturnPlugin
 * @property {string} name - name plugin
 * @property {(*,*):void} generateBundle - generator bundle function.
 */

/**
 *
 * @param {Object} options
 * @param {string[]} options.assets
 * @param {string} options.target
 * @param {boolean} options.dev
 * @return {ReturnPlugin}
 */
export default function (options) {
  options = {
    type: options.dev ? "hardlink" : "copy",
    ...options
  };

  return {
    name: "rollup_plugin_syncer",
    generateBundle(opts, bundle) {
      const dir = opts.dir || path.dirname(opts.file);
      const assets = options.assets || [];
      assets.forEach((asset) => {
        const filepath = path.resolve(asset);
        if (fs.existsSync(filepath)) {
          syncFolders(filepath, dir, options);
        }
      });
    }
  };
}
