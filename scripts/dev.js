const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const portfinder = require('portfinder');
const opn = require('opn');
const dirs = getDirs(path.join(__dirname, '../src'));
const app = express();
const ip = require('ip')

const webpackConfig = require(`../configs/webpack.dev.conf.js`);
process.env.NODE_ENV = 'development';


dirs.forEach(function(dir, index) {
    let _config = new webpackConfig(dir)[0];

    app.use(devMiddleware(webpack(_config), {
        publicPath: _config.output.publicPath
    }));
    app.use(hotMiddleware(webpack(_config), {
        path: `/${dir}/__webpack_hmr`
    }));
});

portfinder.basePort = 8080;
portfinder.getPortPromise().then(function (port) {
    app.listen(port, function(){
        opn(`http://${ip.address()}:${port}`);
    });
});

function getDirs(_dir) {
    return fs.readdirSync(_dir)
        .filter((_file) => {
            return fs.statSync(path.join(_dir, _file)).isDirectory()
        })
}