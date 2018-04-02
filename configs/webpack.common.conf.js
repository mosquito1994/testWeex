const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('./config');
const helper = require('./helper');
const vueLoaderConfig = require('./vue-loader.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function (dir) {
  
  const vueWebTemp = helper.rootNode(config.templateDir, dir);
  const hasPluginInstalled = fs.existsSync(helper.rootNode(config.pluginFilePath, dir));
  const isWin = /^win/.test(process.platform);
  const weexEntry = {
    'index': helper.root(dir, 'entry.js')
  }

  const getEntryFileContent = (source, routerpath) => {
    let relativePluginPath = helper.rootNode(config.pluginFilePath, dir);
    let entryContents = fs.readFileSync(source).toString();
    let contents = '';

    entryContents = entryContents.replace(/\/\* weex initialized/, match => `import Vue from 'vue'\nimport weex from 'weex-vue-render'\nweex.init(Vue);\n${match}`);
    if (isWin) {
      relativePluginPath = relativePluginPath.replace(/\\/g, '\\\\');
    }
    if (hasPluginInstalled) {
      contents += `\n// If detact plugins/plugin.js is exist, import and the plugin.js\n`;
      contents += `import plugins from '${relativePluginPath}';\n`;
      contents += `plugins.forEach(function (plugin) {\n\tweex.install(plugin)\n});\n\n`;
      entryContents = entryContents.replace(/\.\/router/, routerpath);
      entryContents = entryContents.replace(/weex\.init/, match => `${contents}${match}`);
    }
    return entryContents;
  }

  const getRouterFileContent = (source) => {
    const dependence = `import Vue from 'vue'\n`;
    let routerContents = fs.readFileSync(source).toString();
    routerContents = dependence + routerContents;
    return routerContents;
  }

  const getEntryFile = () => {
    const entryFile = path.join(vueWebTemp, config.entryFilePath)
    const routerFile = path.join(vueWebTemp, config.routerFilePath)
    fs.outputFileSync(entryFile, getEntryFileContent(helper.root(dir, config.entryFilePath)));
    fs.outputFileSync(routerFile, getRouterFileContent(helper.root(dir, config.routerFilePath)));
    return {
      index: entryFile
    }
  }

  // The entry file for web needs to add some library. such as vue, weex-vue-render
  // 1. src/entry.js 
  // import Vue from 'vue';
  // import weex from 'weex-vue-render';
  // weex.init(Vue);
  // 2. src/router/index.js
  // import Vue from 'vue'
  const webEntry = getEntryFile();

  const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [helper.rootNode('src', dir), helper.rootNode('test', dir)],
    options: {
      formatter: require('eslint-friendly-formatter'),
      emitWarning: !config.dev.showEslintErrorsInOverlay
    }
  })
  const useEslint = config.dev.useEslint ? [createLintingRule()] : []

  /**
   * Plugins for webpack configuration.
   */
  let plugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: helper.rootNode(`web/${dir}/index.html`),
      chunksSortMode: 'dependency',
      inject: true,
      minimize: false
    }),
    new webpack.BannerPlugin({
      banner: '// { "framework": "Vue"} \n',
      raw: true,
      exclude: 'Vue'
    })
  ];

  // Config for compile jsbundle for web.
  // entry: Object.assign(webEntry, {
  //   'vendor': [path.resolve('node_modules/phantom-limb/index.js')]
  // }),
  let cssLoader = ["postcss-loader", "css-loader", "less-loader"];

  if (process.env.NODE_ENV == 'production') { // 开发环境不用extractTextPlugin
    cssLoader = ExtractTextPlugin.extract({
      use: ["postcss-loader", "css-loader", "less-loader"]
    })
    plugins.push(new ExtractTextPlugin("[name].[chunkhash].css"));
  }

  const webConfig = {
    entry: webEntry,
    output: {
      path: helper.rootNode('./dist', dir),
      filename: '[name].web.js',
      publicPath: `/${dir}`
    },
    /**
     * Options affecting the resolving of modules.
     * See http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': helper.resolve('src', dir),
        'assets': helper.resolve('web/assets')
      }
    },
    /*
    * Options affecting the resolving of modules.
    *
    * See: http://webpack.github.io/docs/configuration.html#module
    */
    module: {
      // webpack 2.0 
      rules: useEslint.concat([
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.js$/,
          use: [{
            loader: 'babel-loader'
          }],
          exclude: /node_modules(?!(\/|\\).*(weex).*)/
        },
        {
          test: /\.css|\.less/,
          use: cssLoader
        },
        {
          test: /\.vue(\?[^?]+)?$/,
          use: [{
            loader: 'vue-loader',
            options: Object.assign(vueLoaderConfig({useVue: true, usePostCSS: false}), {
              /**
               * important! should use postTransformNode to add $processStyle for
               * inline style prefixing.
               */
              optimizeSSR: false,
              postcss: [
                require('postcss-plugin-weex')(),
                require('autoprefixer')({
                  browsers: ['> 0.1%', 'ios >= 8', 'not ie < 12']
                }),
                require('postcss-plugin-px2rem')({ 
                  rootValue: 75,
                  propBlackList: ['border']
                })
              ],
              compilerModules: [{
                postTransformNode: el => {
                  require('weex-vue-precompiler')()(el)
                }
              }]
              
            })
          }]
        }
      ])
    },
    /*
    * Add additional plugins to the compiler.
    *
    * See: http://webpack.github.io/docs/configuration.html#plugins
    */
    plugins: plugins
  };
  // Config for compile jsbundle for native.
  const weexConfig = {
    entry: weexEntry,
    output: {
      path: path.join(__dirname, '../dist', dir),
      filename: '[name].weex.js'
    },
    /**
     * Options affecting the resolving of modules.
     * See http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': helper.resolve('src', dir),
        'assets': helper.resolve('web/assets')
      }
    },
    /*
    * Options affecting the resolving of modules.
    *
    * See: http://webpack.github.io/docs/configuration.html#module
    */
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [{
            loader: 'babel-loader'
          }]
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.css|\.less/,
          use: ["postcss-loader", "css-loader", "less-loader"]
        },
        {
          test: /\.vue(\?[^?]+)?$/,
          use: [{
            loader: 'weex-loader',
            options: vueLoaderConfig({useVue: false})
          }]
        }
      ]
    },
    /*
    * Add additional plugins to the compiler.
    *
    * See: http://webpack.github.io/docs/configuration.html#plugins
    */
    plugins: [
      new webpack.BannerPlugin({
        banner: '// { "framework": "Vue"} \n',
        raw: true,
        exclude: 'Vue'
      })
    ],
    /*
    * Include polyfills or mocks for various node stuff
    * Description: Node configuration
    *
    * See: https://webpack.github.io/docs/configuration.html#node
    */
    node: config.nodeConfiguration
  };

  return [webConfig, weexConfig];
}
