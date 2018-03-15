const commonConfig = require('./webpack.common.conf');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
// tools
const ip = require('ip').address();
const os = require('os');
const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');
const helper = require('./helper');
const config = require('./config');

/**
 * Webpack Plugins
 */
const UglifyJsparallelPlugin = require('webpack-uglify-parallel');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

/**
 * Webpack configuration for web.
 */
module.exports = function (dir) {
  const productionConfig = webpackMerge(new commonConfig(dir)[0], {
    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: config.prod.devtool,
    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {
      /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */
      path: helper.rootNode('dist/web', dir),
      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: http://webpack.github.io/docs/configuration.html#output-filename
       */
      filename: '[name].[chunkhash].bundle.js',
      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
       */
      sourceMapFilename: '[name].[chunkhash].bundle.map',
      /**
       * The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
       */
      chunkFilename: '[id].[chunkhash].chunk.js'
    },
    /*
    * Add additional plugins to the compiler.
    *
    * See: http://webpack.github.io/docs/configuration.html#plugins
    */
    plugins: [
      /**
       * Plugin: webpack.DefinePlugin
       * Description: The DefinePlugin allows you to create global constants which can be configured at compile time. 
       *
       * See: https://webpack.js.org/plugins/define-plugin/
       */
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': config.prod.env
        }
      }),
      /*
      * Plugin: UglifyJsPlugin
      * Description: Minimize all JavaScript output of chunks.
      * Loaders are switched into minimizing mode.
      *
      * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      */
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: helper.rootNode(`web/${dir}/index.html`),
        isDevServer: true,
        chunksSortMode: 'dependency',
        inject: true,
        chunks: [dir],
        // production
        minimize: true
      }),
      /*
      * Plugin: HtmlWebpackPlugin
      * Description: Simplifies creation of HTML files to serve your webpack bundles.
      * This is especially useful for webpack bundles that include a hash in the filename
      * which changes every compilation.
      *
      * See: https://github.com/ampedandwired/html-webpack-plugin
      */
      new HtmlWebpackPlugin({
        template: 'web/' + dir + '/index.html',
        chunksSortMode: 'dependency',
        inject: 'head'
      }),
      /*
      * Plugin: ScriptExtHtmlWebpackPlugin
      * Description: Enhances html-webpack-plugin functionality
      * with different deployment options for your scripts including:
      *
      * See: https://github.com/numical/script-ext-html-webpack-plugin
      */
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),
      /*
      * Plugin: UglifyJsparallelPlugin
      * Description: Identical to standard uglify webpack plugin
      * with an option to build multiple files in parallel
      *
      * See: https://www.npmjs.com/package/webpack-uglify-parallel
      */
      new UglifyJsparallelPlugin({
        workers: os.cpus().length,
        mangle: true,
        compressor: {
          warnings: false,
          drop_console: true,
          drop_debugger: true
        }
      })
    ]
  });

  /**
   * Webpack configuration for weex.
   */
  const weexConfig = webpackMerge(new commonConfig(dir)[1], {
    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {
      /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */
      path: helper.rootNode('dist/weex', dir),
      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: http://webpack.github.io/docs/configuration.html#output-filename
       */
      filename: '[name].weex.js'
    },
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
      new UglifyJsparallelPlugin({
        workers: os.cpus().length,
        mangle: true,
        compressor: {
          warnings: false,
          drop_console: true,
          drop_debugger: true
        }
      })
    ]
  })

  return productionConfig;
}
