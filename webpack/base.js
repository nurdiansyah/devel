'use strict'

const configNode = require('config')
const fs = require('fs')
const path = require('path')
const paths = require('./paths')
const resolve = require('resolve')
const webpack = require('webpack')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt')
const typescriptFormatter = require('react-dev-utils/typescriptFormatter')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/'
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const outputBase = 'dist'
const env = configNode.get()

const useTypeScript = fs.existsSync(paths.appTsConfig)

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = config => {
  const appSrc = config.appSrc || paths.Src
  return {
    mode: config.mode,
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
    // See the discussion in https://github.com/facebook/create-react-app/issues/343
    devtool: config.devTool || 'cheap-module-source-map',
    // These are the "entry points" to our application.
    // This means they will be the "root" imports that are included in JS bundle.
    entry: config.entry,
    output: config.output,
    optimization: config.optimization,
    module: config.module || {
      strictExportPresence: true,
      rules: [
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: `${outputBase}/media/[name].[hash:8].[ext]`
              }
            },
            // process typescript babel
            {
              test: /\.(ts|tsx)$/,
              include: appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                presets: [
                  require.resolve('@deboxsoft/babel/preset/typescript'),
                  require.resolve('@deboxsoft/babel/preset/react'),
                  require.resolve('@deboxsoft/babel/preset')
                ]
              },
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              // Don't waste time on Gzipping the cache
              cacheCompression: false
            },
            // Process application JS with Babel.
            // The preset includes JSX, Flow, and some ESnext features.
            {
              test: /\.(js|mjs|jsx)$/,
              include: appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                presets: [
                  require.resolve('@deboxsoft/babel/preset/react'),
                  require.resolve('@deboxsoft/babel/preset')
                ]
              },
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              // Don't waste time on Gzipping the cache
              cacheCompression: false
            },
            // Process any JS outside of the app with Babel.
            // Unlike the application JS, we only compile the standard ES features.
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [[require.resolve('@deboxsoft/babel/preset/dependencies'), {helpers: true}]],
                cacheDirectory: true,
                // Don't waste time on Gzipping the cache
                cacheCompression: false,
                // If an error happens in a package, it's possible to be
                // because it was compiled. Thus, we don't want the browser
                // debugger to show the original code. Instead, the code
                // being evaluated would be much more helpful.
                sourceMaps: false
              }
            },
            // This loader creates JavaScript files out of Markdown files, where
            // the JavaScript files export a single React component.
            {
              test: /\.mdx?$/,
              include: paths.appSrc,
              use: [
                {
                  loader: require.resolve('babel-loader'),
                  options: {
                    babelrc: false,
                    configFile: false,
                    compact: false,
                    presets: [[require.resolve('babel-preset-react-app'), {helpers: true}]],
                    cacheDirectory: true,
                    // Don't waste time on Gzipping the cache
                    cacheCompression: false,
                    // If an error happens in a package, it's possible to be
                    // because it was compiled. Thus, we don't want the browser
                    // debugger to show the original code. Instead, the code
                    // being evaluated would be much more helpful.
                    sourceMaps: false
                  }
                },
                require.resolve('mdx-loader')
              ]
            },
            // "file" loader makes sure those assets get served by WebpackDevServer.
            // When you `import` an asset, you get its (virtual) filename.
            // In production, they would get copied to the `build` folder.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              loader: require.resolve('file-loader'),
              options: {
                name: `${outputBase}/media/[name].[hash:8].[ext]`
              }
            }
          ]
        }
        // ** STOP ** Are you adding a new loader?
        // Make sure to add the new loader(s) before the "file" loader.
      ]
    },
    resolve: config.resolve || {
      // This allows you to set a fallback for where Webpack should look for modules.
      // We placed these paths second because we want `node_modules` to "win"
      // if there are any conflicts. This matches Node resolution mechanism.
      // https://github.com/facebook/create-react-app/issues/253
      modules: ['node_modules'].concat(
        // It is guaranteed to exist because we tweak it in `env.js`
        process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
      ),
      // These are the reasonable defaults supported by the Node ecosystem.
      // We also include JSX as a common component filename extension to support
      // some tools, although we do not recommend using it, see:
      // https://github.com/facebook/create-react-app/issues/290
      // `web` extension prefixes have been added for better support
      // for React Native Web.
      extensions: paths.moduleFileExtensions
        .map(ext => `.${ext}`)
        .filter(ext => useTypeScript || !ext.includes('ts')),
      alias: {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web'
      },
      plugins: [
        // Adds support for installing with Plug'n'Play, leading to faster installs and adding
        // guards against forgotten dependencies and such.
        PnpWebpackPlugin,
        // Prevents users from importing files from outside of src/ (or node_modules/).
        // This often causes confusion because we only process files within src/ with babel.
        // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
        // please link the files into your node_modules/ and let module-resolution kick in.
        // Make sure your source files are compiled, as they will not be processed in any way.
        new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
      ]
    },
    resolveLoader: config.resolveLoader || {
      plugins: [
        // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
        // from the current package.
        PnpWebpackPlugin.moduleLoader(module)
      ]
    },
    plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(config.htmlwebpackPlugin),
      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      // In development, this will be an empty string.
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      // This gives some necessary context to module not found errors, such as
      // the requesting resource.
      new ModuleNotFoundPlugin(paths.appPath),
      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
      new webpack.DefinePlugin(env.stringified),

      // add config,plugins
      ...config.plugins,

      // Moment.js is an extremely popular library that bundles large locale files
      // by default due to how Webpack interprets its code. This is a practical
      // solution that requires the user to opt into importing specific locales.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // Generate a manifest file which contains a mapping of all asset filenames
      // to their corresponding output file so that tools can pick it up without
      // having to parse `index.html`.
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: publicPath
      }),
      // TypeScript type checking
      useTypeScript &&
        new ForkTsCheckerWebpackPlugin({
          typescript: resolve.sync('typescript', {
            basedir: paths.appNodeModules
          }),
          async: false,
          checkSyntacticErrors: true,
          tsconfig: paths.appTsConfig,
          compilerOptions: {
            module: 'esnext',
            moduleResolution: 'node',
            resolveJsonModule: true,
            isolatedModules: true,
            noEmit: true,
            jsx: 'preserve'
          },
          reportFiles: [
            '**',
            '!**/*.json',
            '!**/__tests__/**',
            '!**/?(*.)(spec|test).*',
            '!src/setupProxy.js',
            '!src/setupTests.*'
          ],
          watch: paths.appSrc,
          silent: true,
          formatter: typescriptFormatter
        })
    ].filter(Boolean),
    context: config.context || path.join(__dirname, '..'),
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: config.node || {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
      __filename: true
    },
    // Turn off performance processing because we utilize
    // our own hints via the FileSizeReporter
    performance: config.performance || false
  }
}
