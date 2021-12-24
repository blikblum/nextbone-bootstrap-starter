const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

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
        ident: 'postcss',
        sourceMap: true,
        plugins: [autoprefixer()],
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
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.js'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async function (config) {
    config.plugins.push(
      new webpack.DefinePlugin({
        FIREBASE_REMOTE_DATA: JSON.stringify(false),
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
    config.node = {
      constants: false,
    }
    config.module.rules.push(sassRule)
    return config
  },
}
