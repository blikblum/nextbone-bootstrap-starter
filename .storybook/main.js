const path = require('path')
const webpack = require('webpack')
const fs = require('fs')

const sassExcludes = []

const sassRule = {
  test: /\.(sass|scss)$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        postcssOptions: {
          plugins: [['autoprefixer', {}]],
        },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        sassOptions: {
          importer: function (url) {
            if (sassExcludes.includes(url)) {
              return { contents: '' }
            }
            return null
          },
        },
      },
    },
  ],
}

module.exports = {
  core: {
    builder: 'webpack5',
  },
  features: {
    babelModeV7: true,
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.js'],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: async function (config) {
    config.plugins.push(
      new webpack.DefinePlugin({
        REMOTE_DATA: JSON.stringify(false),
      })
    )
    if (config.name !== 'manager') {
      // find plugin-proposal-decorators plugin and patch it
      config.module.rules.forEach((rule) => {
        const ruleUse = rule.use && rule.use[0]
        const isBabelLoader =
          ruleUse && typeof ruleUse.loader === 'string' && ruleUse.loader.match('babel-loader')
        if (isBabelLoader && ruleUse.options.plugins) {
          ruleUse.options.plugins.forEach((plugin) => {
            if (
              Array.isArray(plugin) &&
              typeof plugin[0] === 'string' &&
              plugin[0].match('plugin-proposal-decorators')
            ) {
              console.log('found decorator plugin', JSON.stringify(plugin, null, 2))
              plugin[1].legacy = false
              plugin[1].decoratorsBeforeExport = false
            }
          })
        }
      })

      config.resolve.modules = [path.resolve(__dirname, '../src/common'), 'node_modules']
    }
    config.module.rules.push(sassRule)
    return config
  },
}
