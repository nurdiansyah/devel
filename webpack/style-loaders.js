'use strict'

/* eslint-disable global-require */

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')

// style files regexes
const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor, shouldUseRelativeAssetPaths = true) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: Object.assign({}, shouldUseRelativeAssetPaths ? {publicPath: '../../'} : undefined)
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009'
            },
            stage: 3
          })
        ],
        sourceMap: shouldUseSourceMap
      }
    }
  ]
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: shouldUseSourceMap
      }
    })
  }
  return loaders
}

const rules = [
  // "postcss" loader applies autoprefixer to our CSS.
  // "css" loader resolves paths in CSS and adds assets as dependencies.
  // `MiniCSSExtractPlugin` extracts styles into CSS
  // files. If you use code splitting, async bundles will have their own separate CSS chunk file.
  // By default we support CSS Modules with the extension .module.css
  {
    test: cssRegex,
    exclude: cssModuleRegex,
    loader: getStyleLoaders({
      importLoaders: 1,
      sourceMap: shouldUseSourceMap
    }),
    // Don't consider CSS imports dead code even if the
    // containing package claims to have no side effects.
    // Remove this when webpack adds a warning or an error for this.
    // See https://github.com/webpack/webpack/issues/6571
    sideEffects: true
  },
  // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
  // using the extension .module.css
  {
    test: cssModuleRegex,
    loader: getStyleLoaders({
      importLoaders: 1,
      sourceMap: shouldUseSourceMap,
      modules: true,
      getLocalIdent: getCSSModuleLocalIdent
    })
  },
  // Opt-in support for SASS. The logic here is somewhat similar
  // as in the CSS routine, except that "sass-loader" runs first
  // to compile SASS files into CSS.
  // By default we support SASS Modules with the
  // extensions .module.scss or .module.sass
  {
    test: sassRegex,
    exclude: sassModuleRegex,
    loader: getStyleLoaders(
      {
        importLoaders: 2,
        sourceMap: shouldUseSourceMap
      },
      'sass-loader'
    ),
    // Don't consider CSS imports dead code even if the
    // containing package claims to have no side effects.
    // Remove this when webpack adds a warning or an error for this.
    // See https://github.com/webpack/webpack/issues/6571
    sideEffects: true
  },
  // Adds support for CSS Modules, but using SASS
  // using the extension .module.scss or .module.sass
  {
    test: sassModuleRegex,
    loader: getStyleLoaders(
      {
        importLoaders: 2,
        sourceMap: shouldUseSourceMap,
        modules: true,
        getLocalIdent: getCSSModuleLocalIdent
      },
      'sass-loader'
    )
  }
]

const plugins = [
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: 'static/css/[name].[contenthash:8].css',
    chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
  })
]

module.exports = {
  rules,
  plugins
}
