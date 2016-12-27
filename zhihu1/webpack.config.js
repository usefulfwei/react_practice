const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
//a generated hash in them
const node_modules = path.resolve(__dirname, 'node_modules');

const config = {
  devtool: 'eval',
  entry: {
    commons: [
      'react',
      'react-dom',
      'react-router',
      'history'
    ],
    index: [
      './index.js'
    ]
  },
  resolve: {
    alias: {
      //'react': 'react/dist/react.js',
      'react-dom': 'react-dom/dist/react-dom.min.js',
      'react-router': 'react-router/umd/ReactRouter.min.js',
      'history': 'history/umd/History.min.js',
    }
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/static/',
    filename: '[name].[hash].bundle.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('commons', '[name].[hash].bundle.js'),
    new AssetsPlugin({
      filename: 'build/webpack.assets.js',
      processOutput: assets => 'window.WEBPACK_ASSETS = ' + JSON.stringify(assets)
    }),
    new webpack.DefinePlugin({
      __DEBUG__: true,
      'process.env': {
        'NODE_ENV': JSON.stringify("production")
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    },{
      test: /\.(css)$/,
      loaders: [
        'style-loader',
        'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss-loader'
      ]
    },{
      test: /\.(png|jpg)$/, loader: 'url-loader?limit=50000&name=images/[hash].[ext]'
    }],
    nodeParse: [
      'react/dist/react.min.js',
      'react-dom/dist/react-dom.min.js',
      'react-router/umd/ReactRouter.min.js'
    ]
  }
}

module.exports = config;
