const autoprefixer = require('autoprefixer')

const isDevel = process.NODE_ENV !== 'production'

const cssLoader = opt => [
  '@deboxsoft/devel-webapp/css-loader',
  {
    loader: 'css-loader',
    options: {
      debug: opt.DEBUG,
      sourceMap: isDevel,
      // CSS Modules https://github.com/css-modules/css-modules
      modules: true,
      // importLoaders: 1,
      localIdentName: isDevel ? '[local]__[hash:base64:5]' : 'dbox__[hash:base64:5]',
      // CSS Nano http://cssnano.co/options/
      minimize: !isDevel
    }
  }
]

let includeModulePath = [/node_modules\/@debox/]

module.exports = opt => {
  const cssBasePath = opt.cssBasePath
  if (Array.isArray(cssBasePath)) {
    includeModulePath = includeModulePath.concat(cssBasePath)
  } else {
    cssBasePath && includeModulePath.push(cssBasePath)
  }

  return [
    {
      test: /\.p?css$/,
      include: includeModulePath,
      exclude: [/-global/],
      use: [...cssLoader(opt), 'postcss-loader']
    },
    {
      test: /\.p?css$/,
      include: [/-global/],
      use: ['style-loader', 'css-loader?minimize=true,modules=false', 'postcss-loader']
    },
    {
      test: /\.s[ca]ss$/,
      include: includeModulePath,
      exclude: [/-global/],
      use: [
        ...cssLoader(opt),
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss-id',
            plugins: () => [autoprefixer()]
          }
        },
        {
          loader: 'sass-loader',
          options: {
            debug: opt.DEBUG
          }
        }
      ]
    },
    {
      test: /\.s[ca]ss$/,
      include: [/-global/],
      use: [
        'style-loader',
        'css-loader?minimize=true,modules=false',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss-id',
            plugins: () => [autoprefixer]
          }
        },
        {
          loader: 'sass-loader',
          query: {
            debug: opt.DEBUG
          }
        }
      ]
    }
  ]
}
