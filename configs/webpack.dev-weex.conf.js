const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('./config');
const helper = require('./helper');
const vueLoaderConfig = require('./vue-loader.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const commonConfig = require('./webpack.common.conf');
const webpackMerge = require('webpack-merge');

module.exports = function (dir) {
  const weexConfig = webpackMerge(new commonConfig(dir)[1], {
    output: {
      path: path.join(__dirname, '../dist-dev', dir),
      filename: 'index.weex.js'
    },
    /*
    * Add additional plugins to the compiler.
    *
    * See: http://webpack.github.io/docs/configuration.html#plugins
    */
    plugins: [
        new CopyWebpackPlugin([{ 
            context: __dirname,
            from: `../web/${dir}/preview.html`, 
            to: 'index.html' 
        }])
    ],
    watch: true
  });

  return weexConfig;
}
