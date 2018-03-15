const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const rimraf = require('rimraf');
const childProcess = require('child_process');
const dirs = getDirs(path.join(__dirname, '../src'));
const argv = require('yargs').argv;

const envArr = ['common', 'dev', 'prod', 'release'];
const env = argv.env;

rimraf(path.join(__dirname, '../dist'), function () {
    let _env = env;

    if (envArr.indexOf(env) == -1) {
        _env = 'common';
    }
    const webpackConfig = require(`../configs/webpack.${_env}.conf.js`);

    dirs.forEach(function(dir) {
        let _config = new webpackConfig(dir);

        webpack(_config, function (err, stats) {
            if (err) {
                console.log(err);
            }
        });
    });
});

function getDirs(_dir) {
    return fs.readdirSync(_dir)
        .filter((_file) => {
            return fs.statSync(path.join(_dir, _file)).isDirectory()
        })
}