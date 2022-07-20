#!/usr/bin/env node

import { main } from "tsup/dist/cli-main";
import { handleError } from "./errors.js";

/**
 * @type {import("tsup").Options}
 */
const configDefault = {
  skipNodeModulesBundle: true
};
main(configDefault).catch(handleError);
