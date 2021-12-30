const path = require('path')
const webpack = require('webpack')

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
      const ruleIndex = config.module.rules.findIndex(
        (rule) => rule.use && rule.use.options && rule.use.options.babelrc === false
      )
      if (ruleIndex !== -1) {
        config.module.rules.splice(ruleIndex, 1)
      }
      config.resolve.modules = [path.resolve(__dirname, '../src/common'), 'node_modules']
    }
    config.module.rules.push(sassRule)
    return config
  },
}
