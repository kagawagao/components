import webpack from 'webpack'
import { argv } from 'yargs'

const coverage_enabled = !argv.watch

const coverage_reporters = [
  { type: 'lcov' }
]

if (coverage_enabled) {
  coverage_reporters.push(
    { type: 'json-summary', file: 'lcov.json' }
  )
} else {
  coverage_reporters.push(
    { type: 'text-summary' }
  )
}

const debug = require('debug')('app:karma')
debug('Create configuration.')

const karmaConfig = {
  basePath: '../../', // project root in relation to bin/karma.js
  files: [
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    './node_modules/sinon/pkg/sinon.js',
    {
      pattern: './test/unit/index.js',
      watched: false,
      served: true,
      included: true
    }
  ],
  proxies: {
    // '/api/': 'http://0.0.0.0:3000/api/'
  },
  singleRun: coverage_enabled,
  frameworks: ['mocha', 'es6-shim'],
  preprocessors: {
    'test/unit/index.js': ['webpack', 'sourcemap']
  },
  reporters: ['mocha', 'coverage'],
  coverageReporter: {
    reporters: coverage_reporters
  },
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'inline-source-map',
    resolve: {
      modules: ['.', 'node_modules'],
      extensions: ['.css', '.js', '.json', '.vue'],
      alias: {
        vue: 'vue/dist/vue',
        directives: 'plato-directives'
      }
    },
    plugins: [
      new webpack.DefinePlugin({}),
      new webpack.LoaderOptionsPlugin({
        debug: true,
        options: {
          context: __dirname
        },
        vue: {
          postcss: pack => {
            return [
              require('postcss-import')({
                path: '../../styles'
              }),
              require('postcss-url')({
                basePath: '../styles'
              }),
              require('postcss-cssnext')({
                // see: https://github.com/ai/browserslist#queries
                browsers: 'Android >= 4, iOS >= 7',
                features: {
                  customProperties: {
                    variables: require('../../styles/variables')
                  }
                }
              }),
              require('postcss-flexible')({
                remUnit: 75
              }),
              // PostCSS plugin for RTL-optimizations
              require('postcss-rtl')({
                // Custom function for adding prefix to selector. Optional.
                addPrefixToSelector (selector, prefix) {
                  if (/^html/.test(selector)) {
                    return selector.replace(/^html/, `html${prefix}`)
                  }
                  if (/:root/.test(selector)) {
                    return selector.replace(/:root/, `${prefix}:root`)
                  }
                  // compliant with postcss-flexible
                  if (/^\[data-dpr(="[1-3]")?]/.test(selector)) {
                    return `${prefix}${selector}`
                  }
                  return `${prefix} ${selector}`
                }
              }),
              require('postcss-browser-reporter')(),
              require('postcss-reporter')()
            ]
          },
          autoprefixer: false
        }
      })
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: 'vue-style-loader!css-loader?sourceMap',
              js: 'babel-loader'
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules[/\\](?!platojs)/,
          loader: 'babel-loader'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(svg|woff2?|eot|ttf)(\?.*)?$/,
          exclude: /@[1-3]x/, // skip encoding @1x/@2x/@3x images with base64
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]?[hash:7]'
          }
        }
      ]
    },
    node: {
      fs: 'empty',
      net: 'empty'
    },
    performance: {
      hints: false
    }
  },
  webpackMiddleware: {
    noInfo: true
  }
}

export default cfg => cfg.set(karmaConfig)
