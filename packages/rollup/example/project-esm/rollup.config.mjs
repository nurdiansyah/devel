import bundle from "@nurdiansyah/rollup/configs/module.config";

export default bundle(
  {
    input: "src/index.ts",
    output: "index.js"
  },
  {
    type: "module"
  }
);
