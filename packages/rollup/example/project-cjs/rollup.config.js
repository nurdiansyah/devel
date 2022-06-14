/* eslint-disable @typescript-eslint/no-var-requires */
const bundle = require("@nurdiansyah/rollup/configs/module.config");

module.exports = bundle(
  {
    input: "src/index.ts",
    output: "index.js"
  },
  {
    type: "module"
  }
);
