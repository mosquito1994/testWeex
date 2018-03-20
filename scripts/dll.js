const webpack = require('webpack');
const dllConfig = require('../configs/webpack.dll.conf');

webpack(dllConfig, function (err, stats) {
    if (err) {
        console.log(err);
    }
});