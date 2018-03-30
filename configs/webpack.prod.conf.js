const commonConfig = require('./webpack.common.conf');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs

const os = require('os');
/**
 * Webpack Plugins
 */
const UglifyJsparallelPlugin = require('webpack-uglify-parallel');

module.exports = function (dir) {
  /**
   * Webpack configuration for weex.
   */
  const weexConfig = webpackMerge(new commonConfig(dir)[1], {
    /*
    * Add additional plugins to the compiler.
    *
    * See: http://webpack.github.io/docs/configuration.html#plugins
    */
    plugins: [
      /*
      * Plugin: UglifyJsparallelPlugin
      * Description: Identical to standard uglify webpack plugin
      * with an option to build multiple files in parallel
      *
      * See: https://www.npmjs.com/package/webpack-uglify-parallel
      */
      // new UglifyJsparallelPlugin({
      //   workers: os.cpus().length,
      //   mangle: true,
      //   compressor: {
      //     warnings: false,
      //     drop_console: true,
      //     drop_debugger: true
      //   }
      // }),
      // Need to run uglify first, then pipe other webpack plugins
      ...new commonConfig(dir)[1].plugins
    ]
  })

  return weexConfig;
}
