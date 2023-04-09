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
              return {
                contents: '',
              }
            }
            return null
          },
        },
      },
    },
  ],
}
module.exports = {
  features: {
    babelModeV7: true,
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.js'],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: async function (config) {
    config.plugins.push(
      new webpack.DefinePlugin({
        REMOTE_DATA: JSON.stringify(false),
      })
    )
    if (config.name !== 'manager') {
      config.resolve.modules = [
        path.resolve(__dirname, '../src/common'),
        path.resolve(__dirname, '../src'),
        'node_modules',
      ]
    }
    config.module.rules.push(sassRule)
    return config
  },
  framework: {
    name: '@storybook/web-components-webpack5',
    options: {},
  },
}
