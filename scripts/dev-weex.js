const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const rimraf = require('rimraf');
const express = require('express');
const portfinder = require('portfinder');
const opn = require('opn');
const dirs = getDirs(path.join(__dirname, '../src'));
const app = express();
const ip = require('ip');
const webpackConfig = require(`../configs/webpack.dev-weex.conf.js`);

process.env.NODE_ENV = "development";

rimraf(path.join(__dirname, '../dist-dev'), function () {
    dirs.forEach(function(dir) {
        let _config = new webpackConfig(dir);

        webpack(_config, function (err, stats) {
            if (err) {
                throw new Error(err);
            }
            console.log('build success!');
            
            app.use(`/${dir}`, express.static(path.join(__dirname, '../dist-dev', dir)));
            app.use(`/${dir}/assets`, express.static(path.join(__dirname, '../web/assets')));
        });
    });
});

portfinder.basePort = 8090;
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