import bundle from "@nurdiansyah/rollup/configs/module.config";
import path from "path";
import fs from "fs-extra";

const config = bundle(
  {
    input: "src/index.ts",
    output: "index.js"
  },
  {}
);

const pkg = fs.readJsonSync(path.resolve("package.json"));
const dependencies = Object.keys(pkg.dependencies);
const devDependencies = Object.keys(pkg.devDependencies).filter(
  (_) => !["object-path", "projection-utils"].includes(_)
);
const external = [...dependencies, ...devDependencies];
config.external = external;
export default config;
