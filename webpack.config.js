const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

const DIST_DIR = 'dist'
const devDevTool = 'eval-source-map' // see https://webpack.js.org/configuration/devtool/ for options
const prodDevTool = 'source-map'

module.exports = ({ data }, { mode }) => {
  const isProd = mode === 'production'
  const isPWA = false

  const plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new webpack.DefinePlugin({
      REMOTE_DATA: JSON.stringify(isProd || data === 'remote'),
    }),
  ]

  const entry = ['./src/main.js']

  if (isProd) {
    if (isPWA) {
      plugins
        .push
        // workbox
        // new GenerateSW({
        //   swDest: path.join('sw.js'),
        // })
        ()
    }
    plugins.push(
      new MiniCSSExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      })
    )
  }

  return {
    entry,
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, DIST_DIR),
      publicPath: '',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          include: [path.resolve('src'), path.resolve('node_modules/luipack')],
          use: [{ loader: 'babel-loader' }],
        },
        {
          test: /\.css$/,
          use: [isProd ? MiniCSSExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          test: /\.(sass|scss)$/,
          use: [
            isProd ? MiniCSSExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isProd,
                postcssOptions: {
                  plugins: [['autoprefixer', {}]],
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(woff|woff2|ttf|eot|svg|png)$/,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      modules: [
        path.resolve(__dirname, './src/common'),
        path.resolve(__dirname, './src'),
        'node_modules',
      ],
    },
    plugins,
    devtool: isProd ? prodDevTool : devDevTool,
    devServer: {
      compress: true,
      port: 8084,
      open: true,
      static: './dist',
      client: {
        overlay: true,
      },
    },
  }
}
