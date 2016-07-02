'use strict'

var webpack = require('webpack');

var config = {
  output: {
    library: 'remote-image',
    libraryTarget: 'umd'
  },
  externals: {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

if (process.env['NODE_ENV'] === 'production') {
  config.plugins = []
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = config
