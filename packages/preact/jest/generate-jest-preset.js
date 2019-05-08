#!/usr/bin/env node
/**
 * Generates the Expo jest-preset.json by deriving it from React Native's
 * jest-preset.json. This script uses the copy of RN in react-native-lab.
 */

const assert = require('assert')
const fs = require('fs')
const path = require('path')

function generateJestPreset() {
  const jestPreset = {
    moduleNameMapper: {
      "react-dom/server": "preact-render-to-string",
      "react-dom/test-utils": "preact-test-utils",
      "react-dom": "preact-compat-enzyme",
      "react-test-renderer/shallow": "preact-test-utils",
      "react-test-renderer": "preact-test-utils",
      "react-addons-test-utils": "preact-test-utils",
      "react-addons-transition-group": "preact-transition-group",
      "react": "preact-compat-enzyme"
    }
  }

  fs.writeFileSync(
    path.resolve(__dirname, '../jest-preset.json'),
    JSON.stringify(jestPreset, null, 2)
  )
}

if (require.main === module) {
  generateJestPreset()
}
